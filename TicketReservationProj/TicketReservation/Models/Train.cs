/*
 * File: Train.cs
 * Description: Model class for train information.
 */

using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ticketreservation.Models
{
    [BsonIgnoreExtraElements]
    public class Train
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        // Name of the train
        [BsonElement("trainname")]
        public string TrainName { get; set; } = "train name";

        // Date of the train
        [BsonElement("date")]
        public string Date { get; set; } = "date";

        // Start time of the train
        [BsonElement("starttime")]
        public string StartTime { get; set; } = "start time";

        // End time of the train
        [BsonElement("endtime")]
        public string EndTime { get; set; } = "end time";

        // Source station
        [BsonElement("source")]
        public string Source { get; set; } = "source";

        // Destination station
        [BsonElement("destination")]
        public string Destination { get; set; } = "destination";
    }
}
