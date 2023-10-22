/*
 * File: TicketBooking.cs
 * Description: Model class for ticket bookings.
 */

using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ticketreservation.Models
{
    [BsonIgnoreExtraElements]
    public class TicketBooking
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        // Reference ID for the booking
        [BsonElement("referenceId")]
        public string ReferenceId { get; set; } = "train name";

        // Passenger name
        [BsonElement("customerName")]
        public string CustomerName { get; set; } = "train name";

        // Name of the booked train
        [BsonElement("trainName")]
        public string TrainName { get; set; } = "train name";

        // Date of the booking
        [BsonElement("dateOfBooking")]
        public string DateOfBooking { get; set; } = "date";

        // Start time of the booking
        [BsonElement("timeOfBooking")]
        public string TimeOfBooking { get; set; } = "start time";

        [BsonElement("username")]
        public string UserName { get; set; } = "user name";
    }
}
