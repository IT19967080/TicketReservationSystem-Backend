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

namespace ticketreservation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        private readonly IConfiguration _configuration;
        private readonly AuthServices _authService;
        public AuthController(IConfiguration configuration, AuthServices authService)
        {
            _configuration = configuration;
            _authService = authService;
        }



        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            var user = _authService.Register(request);
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {

            var token = await _authService.Login(request);
            return Ok(token);
        }

      
        

        




    }
}
