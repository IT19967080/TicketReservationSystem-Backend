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
		[BsonElement("scheduleId")]
		public string ScheduleId { get; set; } = "scheduleId";

		[BsonElement("trainname")]
        public string TrainName { get; set; } = "train name";

        [BsonElement("date")]
        public string Date { get; set; } = "date";

        [BsonElement("time")]
        public string Time { get; set; } = "time";

        [BsonElement("status")]
        public bool Status { get; set; } 


    }
}

