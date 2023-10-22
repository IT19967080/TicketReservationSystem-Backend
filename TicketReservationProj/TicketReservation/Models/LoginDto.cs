using MongoDB.Bson.Serialization.Attributes;

namespace TicketReservation.Models
/*
 * File: Login.cs
 * Data Transfer Object (DTO) for login.
 */

{
    public class LoginDto
    {
        [BsonElement("username")]
        public string Username { get; set; } = string.Empty;

        [BsonElement("password")]
        public string Password { get; set; } = string.Empty;

    }

}

