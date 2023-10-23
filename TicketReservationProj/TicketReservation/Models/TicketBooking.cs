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
        public string ReferenceId { get; set; } = "R005";

        // Passenger name
        [BsonElement("customerName")]
        public string CustomerName { get; set; } = "Shehan";

        // Name of the booked train
        [BsonElement("trainName")]
        public string TrainName { get; set; } = "Yal Dewi";

        // Date of the booking
        [BsonElement("dateOfBooking")]
        public string DateOfBooking { get; set; } = "2023-11-03";

        // Start time of the booking
        [BsonElement("timeOfBooking")]
        public string TimeOfBooking { get; set; } = "05:00";

        [BsonElement("username")]
        public string UserName { get; set; } = "Rishitha";

        [BsonElement("ticketCount")]
        public string TicketCount { get; set; } = "2";
    }
}
