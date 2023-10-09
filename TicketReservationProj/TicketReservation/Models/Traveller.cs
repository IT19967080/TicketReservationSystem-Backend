using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TicketReservation.Models
{
    [BsonIgnoreExtraElements]
    public class Traveller
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("nic")]
        public string NIC { get; set; } = "NIC";

        [BsonElement("firstName")]
        public string FirstName { get; set; } = "First Name";

        [BsonElement("lastName")]
        public string LastName { get; set; } = "Last Name";

        [BsonElement("dateOfBirth")]
        public string DateOfBirth { get; set; } = "Date of Birth";

        [BsonElement("email")]
        public string Email { get; set; } = "Email";

        [BsonElement("password")]
        public string Password { get; set; } = "Password";

        [BsonElement("phoneNo")]
        public int PhoneNo { get; set; } = 0;

        [BsonElement("isActive")]
        public Boolean IsActive { get; set; } = true;
    }
}
