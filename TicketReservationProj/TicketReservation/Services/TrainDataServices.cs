using System;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ticketreservation.Data;
using TicketReservation.Models;

namespace TicketReservation.Services
{
	public class TrainDataServices
	{
        private readonly IMongoCollection<TrainData> _trainDataCollection;

        public TrainDataServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _trainDataCollection = mongoDb.GetCollection<TrainData>(settings.Value.TrainCollectionName);

        }


        // get all train schedules

        public async Task<List<TrainData>> GetAsync() => await _trainDataCollection.Find(_ => true).ToListAsync();


        // get train schedule byId

        public async Task<TrainData> GetAsync(string id) =>
            await _trainDataCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        //add new schedule


        public async Task createAsync(TrainData newTrian) =>
            await _trainDataCollection.InsertOneAsync(newTrian);


        //update train schedule

        public async Task updateAsync(String id, TrainData updateTrian) =>
            await _trainDataCollection.ReplaceOneAsync(x => x.Id == id, updateTrian);

        //delete train schedule

        public async Task deleteAsync(String id) =>
            await _trainDataCollection.DeleteOneAsync(x => x.Id == id);
    }
}

