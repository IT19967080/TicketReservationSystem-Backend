///*
// * File: AuthServices.cs
// * Description: Service for user authentication and authorization.
// */


//using System;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Security.Cryptography;
//using JwtWebApiTutorial;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.Options;
//using Microsoft.IdentityModel.Tokens;
//using MongoDB.Driver;
//using Newtonsoft.Json.Linq;
//using ticketreservation.Data;
//using ticketreservation.Models;
//using ticketreservation.Services;
//using TicketReservation.Models;
//using User = TicketReservation.Models.User;

//namespace TicketReservation.Services
//{
//    public class AuthServices
//    {
//        private readonly IMongoCollection<UserModel> _userDataCollection;
//        private readonly IConfiguration _configuration;
//        private RefreshToken refreshToken;
//        private readonly UserManagemntServices _userServices;


//        public AuthServices(IOptions<DatabaseSettings> settings , UserManagemntServices userServices, IConfiguration configuration)
//        {
//            var mongoClient = new MongoClient(settings.Value.Connection);
//            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
//            _userDataCollection = mongoDb.GetCollection<UserModel>(settings.Value.UserManagemntCollectionName);
//            _userServices = userServices;
//            _configuration = configuration;
//        }


//        //public async Task Register(UserDto request)
//        //{
//        //    // Check if the user already exists by username
//        //    var existingUser = await _userDataCollection.Find(u => u.Username == request.Username).FirstOrDefaultAsync();
//        //    if (existingUser != null)
//        //    {
//        //        throw new Exception("User already exists.");
//        //    }

//        //    CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

//        //    var user = new User
//        //    {
//        //        Username = request.Username,
//        //        PasswordHash = passwordHash,
//        //        PasswordSalt = passwordSalt,
//        //        Role = request.Role,
//        //        Email = request.Email,
//        //    };

//        //    await _userDataCollection.InsertOneAsync(user);
//        //}


//        //public async Task<string> Login(LoginDto request)
//        //{
//            // Find the user by username
//            //       var user = await _userDataCollection.Find(u => u.UserName == request.Username).FirstOrDefaultAsync();

//            // Create a filter to find the user by username
//            //var filter = Builders<UserModel>.Filter.Eq(u => u.UserName, request.Username);

//            // Use the Find method to search for a user with the given username
//            //var user = await _userDataCollection.Find(filter).FirstOrDefaultAsync();

//            //var user = await _userServices.GetUserByEmail(request.Username);



//            //if (user == null)
//            //{
//            //    throw new Exception("User not found.");
//            //}
//            // Verify the password
//            //if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
//            //{
//            //    throw new Exception("Wrong password.");
//            //}
//            // Create and return an authentication token
//            //string token = CreateToken(request.Username, user.Role);

//            //var refreshToken = GenerateRefreshToken();
//            //user.RefreshToken = refreshToken;

//            //return token;





//        }

//        // Generate a new refresh token
//        private RefreshToken GenerateRefreshToken()
//        {
//            var refreshToken = new RefreshToken
//            {
//                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
//                Expires = DateTime.Now.AddDays(7),
//                Created = DateTime.Now
//            };

//            return refreshToken;
//        }


//        // Verify password
//        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
//        {
//            using (var hmac = new HMACSHA512(passwordSalt))
//            {
//                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
//                return computedHash.SequenceEqual(passwordHash);
//            }
//        }

//        // Create an authentication token
//        private string CreateToken(String username , String role)
//        {
//            List<Claim> claims = new List<Claim>
//            {
//                new Claim(ClaimTypes.Name,username),
//                new Claim(ClaimTypes.Role, role)
//            };

//            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
//                _configuration.GetSection("AppSettings:Token").Value));

//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
//            try
//            {
//                var token = new JwtSecurityToken(
//     claims: claims,
//     expires: DateTime.Now.AddDays(1),
//     signingCredentials: creds);
//                var tokenHandler = new JwtSecurityTokenHandler();

//                var jwt = tokenHandler.WriteToken(token);
//            }
//            catch (Exception)
//            {
//                throw;
//            }
 
//            var u = username;
//            return u;
//        }

//        // Create a password hash
//        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
//        {
//            using (var hmac = new HMACSHA512())
//            {
//                passwordSalt = hmac.Key;
//                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
//            }
//        }


//    }

//}