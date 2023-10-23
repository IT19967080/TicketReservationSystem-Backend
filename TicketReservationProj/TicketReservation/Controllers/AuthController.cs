/*
 * File: AuthController.cs
 * Description: Controller for handling authentication-related API endpoints.
 */

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using TicketReservation;
using TicketReservation.Models;
using TicketReservation.Services;
using Microsoft.Extensions.Configuration;
using ticketreservation.Services;

namespace ticketreservation.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        private readonly IConfiguration _configuration;
        private readonly UserManagemntServices _userServices;


        public AuthController(IConfiguration configuration, UserManagemntServices userServices)
        {
            _configuration = configuration;
            _userServices = userServices;
        }

        //[HttpPost("register")]
        //public async Task<ActionResult<User>> Register(UserDto request)
        //{
        //    // Register a user and return the result.
        //    var user = _authService.Register(request);
        //    return Ok(user);
        //}

        [HttpPost]
        public async Task<ActionResult<string>> Login(LoginDto request)
        {
            // Log in a user and return an authentication token.
            var user = await _userServices.GetUserByEmail(request.Username);
            if (user == null || user.Password != request.Password)
            {
                return BadRequest("Incorrect credentials");
            }
            else
            {
                return Ok(user);
            }
        }
    }
}
