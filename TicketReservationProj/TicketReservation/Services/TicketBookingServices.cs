using System;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ticketreservation.Data;
using ticketreservation.Models;
using TicketReservation.Models;

namespace TicketReservation.Services
{
    public class TicketBookingServices
    {
        private readonly IMongoCollection<TicketBooking> _ticketBookingCollection;

        public TicketBookingServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _ticketBookingCollection = mongoDb.GetCollection<TicketBooking>(settings.Value.TicketBookingCollectionName);

        }


        // get all train schedules

        public async Task<List<TicketBooking>> GetAsync() => await _ticketBookingCollection.Find(_ => true).ToListAsync();


        // get train schedule byId

        public async Task<TicketBooking> GetAsync(string id) =>
            await _ticketBookingCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        //add new schedule


        public async Task createAsync(TicketBooking newTrian) =>
            await _ticketBookingCollection.InsertOneAsync(newTrian);


        //update train schedule

        public async Task updateAsync(String id, TicketBooking updateTrian) =>
            await _ticketBookingCollection.ReplaceOneAsync(x => x.Id == id, updateTrian);

        //delete train schedule

        public async Task deleteAsync(String id) =>
            await _ticketBookingCollection.DeleteOneAsync(x => x.Id == id);


        public async Task<int> GetReservationCountByReferenceIdAsync(string referenceId)
        {
            var filter = Builders<TicketBooking>.Filter.Eq("ReferenceId", referenceId);
            var count = await _ticketBookingCollection.CountDocumentsAsync(filter);
            return (int)count;
        }
    }
}




