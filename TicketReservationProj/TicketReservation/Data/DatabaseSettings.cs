using System;
namespace ticketreservation.Data
{
	public class DatabaseSettings
	{

        public string TrainCollectionName { get; set; }
        public string TrainScheduleCollectionName { get; set; }

        public string UserCollectionName { get; set; }
        public string DatabaseName { get; set; }
        public string Connection { get; set; }

	}
}

