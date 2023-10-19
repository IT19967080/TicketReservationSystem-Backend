/*
 * File: TicketBookingServices.cs
 * Description: Service class for managing ticket booking operations.
 */

using System;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ticketreservation.Data;
using ticketreservation.Models;
using TicketReservation.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        // Get all ticket bookings
        public async Task<List<TicketBooking>> GetAsync() => await _ticketBookingCollection.Find(_ => true).ToListAsync();

        // Get ticket booking by ID
        public async Task<TicketBooking> GetAsync(string id) =>
            await _ticketBookingCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // Add a new ticket booking
        public async Task createAsync(TicketBooking newTrian) =>
            await _ticketBookingCollection.InsertOneAsync(newTrian);

        // Update a ticket booking
        public async Task updateAsync(string id, TicketBooking updateTrian) =>
            await _ticketBookingCollection.ReplaceOneAsync(x => x.Id == id, updateTrian);

        // Delete a ticket booking
        public async Task deleteAsync(string id) =>
            await _ticketBookingCollection.DeleteOneAsync(x => x.Id == id);

        // Get the count of reservations by reference ID
        public async Task<int> GetReservationCountByReferenceIdAsync(string referenceId)
        {
            var filter = Builders<TicketBooking>.Filter.Eq("ReferenceId", referenceId);
            var count = await _ticketBookingCollection.CountDocumentsAsync(filter);
            return (int)count;
        }


        public List<TicketBooking> GetTicketBookingsByUsername(string username)
        {
            // Define a filter to find ticket bookings by username
            var filter = Builders<TicketBooking>.Filter.Eq(tb => tb.UserName, username);

            // Use the filter to find and return the matching ticket bookings
            return _ticketBookingCollection.Find(filter).ToList();
        }

    }
}
