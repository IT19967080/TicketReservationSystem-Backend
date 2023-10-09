using MongoDB.Bson.Serialization.Attributes;

namespace TicketReservation.Models
{
    [BsonIgnoreExtraElements]
    public class TravelerLogin
    {
        [BsonElement("email")]
        public string Email { get; set; } = "Email";

        [BsonElement("password")]
        public string Password { get; set; } = "Password";
    }
}
