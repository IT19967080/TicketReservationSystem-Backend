/*
 * File: DatabaseSettings.cs
 * Description: Configuration settings for database collections and connections.
 */

using System;

namespace ticketreservation.Data
{
    public class DatabaseSettings
    {
        // Name of the collection for trains
        public string TrainCollectionName { get; set; }

        // Name of the collection for train schedules
        public string TrainScheduleCollectionName { get; set; }

        // Name of the collection for users
        public string UserCollectionName { get; set; }

        // Name of the database
        public string DatabaseName { get; set; }

        // Connection string to the database
        public string Connection { get; set; }

        // Name of the collection for travelers
        public string TravellerCollectionName { get; set; }

        // Name of the collection for ticket bookings
        public string TicketBookingCollectionName { get; set; }

        // Name of the collection for user management
        public string UserManagemntCollectionName { get; set; }
    }
}
