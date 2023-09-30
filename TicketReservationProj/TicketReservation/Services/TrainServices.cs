using System;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ticketreservation.Models;
using ticketreservation.Data;


namespace ticketreservation.Services
{
	public class TrainServices
	{
		private readonly IMongoCollection<Train> _trainCollection;

		public TrainServices(IOptions<DatabaseSettings> settings)
		{
			var mongoClient = new MongoClient(settings.Value.Connection);
			var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
			_trainCollection = mongoDb.GetCollection<Train>(settings.Value.CollectionName);

		}



		// get all train schedules

		public async Task<List<Train>> GetAsync() => await _trainCollection.Find(_ => true).ToListAsync();


		// get train schedule byId

		public async Task<Train> GetAsync(string id) =>
			await _trainCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

		//add new schedule


		public async Task createAsync(Train newTrian) =>
			await _trainCollection.InsertOneAsync(newTrian);


		//update train schedule

        public async Task updateAsync(String id,Train updateTrian) =>
            await _trainCollection.ReplaceOneAsync(x => x.Id == id,updateTrian);

		//delete train schedule

        public async Task deleteAsync(String id) =>
			await _trainCollection.DeleteOneAsync(x => x.Id == id);



    }
}

