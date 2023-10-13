/*
 * File: TrainServices.cs
 * Description: Service class for managing train services and schedules.
 */

using System;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ticketreservation.Models;
using ticketreservation.Data;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ticketreservation.Services
{
    public class TrainServices
    {
        private readonly IMongoCollection<Train> _trainCollection;

        public TrainServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _trainCollection = mongoDb.GetCollection<Train>(settings.Value.TrainScheduleCollectionName);
        }

        // Get all train schedules
        public async Task<List<Train>> GetAsync() => await _trainCollection.Find(_ => true).ToListAsync();

        // Get train schedule by ID
        public async Task<Train> GetAsync(string id) =>
            await _trainCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // Add a new train schedule
        public async Task createAsync(Train newTrian) =>
            await _trainCollection.InsertOneAsync(newTrian);

        // Update train schedule
        public async Task updateAsync(string id, Train updateTrian) =>
            await _trainCollection.ReplaceOneAsync(x => x.Id == id, updateTrian);

        // Delete train schedule
        public async Task deleteAsync(string id) =>
            await _trainCollection.DeleteOneAsync(x => x.Id == id);
    }
}
