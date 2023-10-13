/*
 * File: UserDto.cs
 * Data Transfer Object (DTO) for user-related information.
 * Description: Main entry point for the ASP.NET Core application.
 */

namespace TicketReservation
{
    public class UserDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

}
