using System;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ticketreservation.Models;
using ticketreservation.Data;
using Microsoft.Extensions.Logging;

// Configure Serilog in your application startup code.


namespace ticketreservation.Services
{

    public class UserManagemntServices
    {


        private readonly IMongoCollection<UserModel> _userCollection;
        private object _userRepository;

        public UserManagemntServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _userCollection = mongoDb.GetCollection<UserModel>(settings.Value.UserManagemntCollectionName);

        }


        // User registration logic
        public async Task RegisterUser(UserModel newUser)
        {
            // Validate input (you can add more validation as needed)
            //if (newUser == null)
            //{
            //    throw new ArgumentNullException(nameof(newUser));
            //}


            //// Check if a user with the same username already exists
            //var existingUser = _userCollection.Find(u => u.UserName == newUser.UserName).FirstOrDefault();
            //if (existingUser != null)
            //{
            //    throw new InvalidOperationException("A user with the same username already exists.");
            //}

            // Store the new user in the database
            await _userCollection.InsertOneAsync(newUser);
        }

        public async Task<UserModel> GetUserByUsername(string username)
        {
            // Create a filter to find the user by username
            var filter = Builders<UserModel>.Filter.Eq(u => u.UserName, username);

            // Use the Find method to search for a user with the given username
            var user = await _userCollection.Find(filter).FirstOrDefaultAsync();

            return user;
        }

    }
}

