using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ticketreservation.Data;
using ticketreservation.Models;
using TicketReservation.Models;

//Contains all the database operations related to traveler profiles

namespace TicketReservation.Services
{
    public class TravellerServices
    {
        private readonly IMongoCollection<Traveller> _travellerCollection;

        public TravellerServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _travellerCollection = mongoDb.GetCollection<Traveller>(settings.Value.TravellerCollectionName);
        }

        //get all traveller profiles
        public async Task<List<Traveller>> GetAllAsync() => await _travellerCollection.Find(_ => true).ToListAsync();

        //get traveller profile by id
        public async Task<Traveller> GetByIdAsync(string id) => await _travellerCollection.Find(data => data.Id == id).FirstOrDefaultAsync();

        //get traveller profile by NIC
        public async Task<Traveller> GetByNICAsync(string nic) => await _travellerCollection.Find(data => data.NIC == nic).FirstOrDefaultAsync();

        //get traveller profile by email
        public async Task<Traveller> GetByEmailAsync(string email) => await _travellerCollection.Find(data => data.Email == email).FirstOrDefaultAsync();

        //create traveller profile
        public async Task createTravellerProfile(Traveller traveller) => await _travellerCollection.InsertOneAsync(traveller);

        //update traveller profile 
        public async Task updateTravellerProfile(string nic, Traveller traveller) => await _travellerCollection.ReplaceOneAsync(data => data.NIC == nic, traveller);

        //delete traveller profile
        public async Task deleteTravellerProfile(string nic) => await _travellerCollection.DeleteOneAsync(data => data.NIC == nic);

       
    }
}
