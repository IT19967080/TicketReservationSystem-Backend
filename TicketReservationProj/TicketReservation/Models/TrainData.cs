/*
 * File: TrainData.cs
 * Description: Model class for train data.
 */

using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TicketReservation.Models
{
    [BsonIgnoreExtraElements]
    public class TrainData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        // Name of the train
        [BsonElement("trainname")]
        public string TrainName { get; set; } = "train name";

        // Name of the driver
        [BsonElement("drivername")]
        public string DriverName { get; set; } = "driver name";

        // Capacity of the train
        [BsonElement("capacity")]
        public string Capacity { get; set; } = "capacity";

        // Status of the train (e.g., operational or not)
        [BsonElement("status")]
        public bool Status { get; set; } = true;

        // Type of the train
        [BsonElement("traintype")]
        public string TrainType { get; set; } = "train type";
    }
}
