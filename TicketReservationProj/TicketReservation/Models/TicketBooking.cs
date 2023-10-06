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

        [BsonElement("referenceid")]
        public string ReferenceId { get; set; } = "train name";

        [BsonElement("name")]
        public string Name { get; set; } = "train name";

        [BsonElement("trainname")]
        public string TrainName { get; set; } = "train name";

        [BsonElement("date")]
        public string Date { get; set; } = "date";

        [BsonElement("time")]
        public string Time { get; set; } = "start time";


    
    }
}




