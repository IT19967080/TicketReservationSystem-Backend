using Microsoft.AspNetCore.Mvc;
using TicketReservation.Models;
using TicketReservation.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TicketReservation.Controllers
{
    [Route("api/travelers")]
    [ApiController]
    public class TravellerManagementController : ControllerBase
    {
        private readonly TravellerServices _travellerServices;

        public TravellerManagementController(TravellerServices travellerServices)
        {
            _travellerServices = travellerServices;
        }

        // GET: api/travellers
        [HttpGet]
        public async Task<ActionResult<List<Traveller>>> GetAll()
        {
            var travellers = await _travellerServices.GetAllAsync();
            return Ok(travellers);
        }

        // GET: api/travellers/{nic}
        [HttpGet("{nic}")]
        public async Task<ActionResult<Traveller>> GetByNIC(string nic)
        {
            var traveller = await _travellerServices.GetByNICAsync(nic);
            return Ok(traveller);
        }

        // POST: api/travellers
        [HttpPost]
        public async Task<IActionResult> CreateProfile([FromBody] Traveller traveller)
        {
            await _travellerServices.createTravellerProfile(traveller);
            return CreatedAtAction(nameof(GetAll), new { id = traveller.Id }, traveller);
        }

        // PUT: api/travellers/{nic}
        [HttpPut("{nic}")]
        public async Task<IActionResult> UpdateProfile(string nic, Traveller traveller)
        {
            var existingTraveller = await _travellerServices.GetByNICAsync(nic);
            if (existingTraveller == null)
            {
                return NotFound();
            }
            traveller.Id = existingTraveller.Id;
            await _travellerServices.updateTravellerProfile(nic, traveller);
            return Ok(traveller);
        }

        // DELETE: api/travellers/{nic}
        [HttpDelete("{nic}")]
        public async Task<IActionResult> Delete(string nic)
        {
            var existingTraveller = await _travellerServices.GetByNICAsync(nic);
            if (existingTraveller == null)
            {
                return NotFound();
            }
            await _travellerServices.deleteTravellerProfile(nic);
            return Ok("Deleted Succesfully");
        }

        // POST: api/travelers/login
        [HttpPost("login")]
        public async Task<IActionResult> login([FromBody] TravelerLogin travelerLogin)
        {
            var traveler = await _travellerServices.GetByEmailAsync(travelerLogin.Email);
            if (traveler == null || traveler.Password != travelerLogin.Password)
            {
                return BadRequest("Incorrect credentials");
            }
            else
            {
                return Ok(traveler);
            }

        }

        // PUT: api/travelers/activate
        [HttpPut("activate/{nic}")]
        public async Task<IActionResult> activateTraveler(string nic)
        {
            var traveler = await _travellerServices.GetByNICAsync(nic);
            if (traveler == null)
            {
                return BadRequest("User does not exist");
            }
            else
            {
                traveler.IsActive = true;
                await _travellerServices.updateTravellerProfile(nic, traveler);
                return Ok(traveler);
            }

        }

        // PUT: api/travelers/activate
        [HttpPut("deactivate/{nic}")]
        public async Task<IActionResult> deactivateTraveler(string nic)
        {
            var traveler = await _travellerServices.GetByNICAsync(nic);
            if (traveler == null)
            {
                return BadRequest("User does not exist");
            }
            else
            {
                traveler.IsActive = false;
                await _travellerServices.updateTravellerProfile(nic, traveler);
                return Ok(traveler);
            }

        }


    }
}
