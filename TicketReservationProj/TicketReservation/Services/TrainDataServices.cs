/*
 * File: TrainDataServices.cs
 * Description: Service class for managing train data operations.
 */

using System;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ticketreservation.Data;
using TicketReservation.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        // Get all train data
        public async Task<List<TrainData>> GetAsync() => await _trainDataCollection.Find(_ => true).ToListAsync();

        // Get train data by ID
        public async Task<TrainData> GetAsync(string id) =>
            await _trainDataCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // Add a new train data
        public async Task createAsync(TrainData newTrian) =>
            await _trainDataCollection.InsertOneAsync(newTrian);

        // Update train data
        public async Task updateAsync(string id, TrainData updateTrian) =>
            await _trainDataCollection.ReplaceOneAsync(x => x.Id == id, updateTrian);

        // Delete train data
        public async Task deleteAsync(string id) =>
            await _trainDataCollection.DeleteOneAsync(x => x.Id == id);

        // Get Activated trains
        public async Task<List<TrainData>> GetActivatedTrains()
        {
            var filter = Builders<TrainData>.Filter.Eq(t => t.Status, "activated");
            var activatedTrains = await _trainDataCollection.Find(filter).ToListAsync();
            return activatedTrains;
        }

    }
}
