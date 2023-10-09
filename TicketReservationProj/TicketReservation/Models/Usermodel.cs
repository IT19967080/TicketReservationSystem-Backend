using System;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ticketreservation.Models
{
    [BsonIgnoreExtraElements]
    public class UserModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;


        [BsonElement("username")]
        public string UserName { get; set; } = "username";

        [BsonElement("password")]
        public string Password { get; set; } = "password";

        [BsonElement("role")]
        public string Role { get; set; } = "role";

        [BsonElement("email")]
        public string Email { get; set; } = "email";


    }
}

