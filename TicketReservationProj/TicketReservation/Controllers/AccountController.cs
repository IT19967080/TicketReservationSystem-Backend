using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketReservation.Controllers
{
    [Route("api/account")]
    [ApiController]
    [Authorize]
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }

    [HttpGet("login")]
    public async IActionResult Get()
    {
        var trains = await _trainServices.GetAsync();
        return Ok(trains);
    }

}
