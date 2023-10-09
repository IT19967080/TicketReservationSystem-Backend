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


            [BsonElement("trainname")]
            public string TrainName { get; set; } = "train name";

            [BsonElement("drivername")]
            public string DriverName { get; set; } = "driver name";

            [BsonElement("capacity")]
            public string Capacity { get; set; } = "start time";

            [BsonElement("status")]
            public Boolean Status { get; set; } = true;

            [BsonElement("triantype")]
            public String TrianType { get; set; } = "trian type";

        }
    
}

