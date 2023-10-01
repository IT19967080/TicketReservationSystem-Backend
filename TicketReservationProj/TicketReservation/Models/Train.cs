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
	

		[BsonElement("trainname")]
        public string TrainName { get; set; } = "train name";

        [BsonElement("date")]
        public string Date { get; set; } = "date";

        [BsonElement("starttime")]
        public string StartTime { get; set; } = "start time";

        [BsonElement("endtime")]
        public string EndTime { get; set; } = "end time";

        [BsonElement("source")]
        public String Source { get; set; } = "source";

        [BsonElement("destination")]
        public String Destination { get; set; } = "destination";
    }
}

