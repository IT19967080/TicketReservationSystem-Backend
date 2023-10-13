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
        //Get all registered traveler accounts
        [HttpGet]
        public async Task<ActionResult<List<Traveller>>> GetAll()
        {
            var travellers = await _travellerServices.GetAllAsync();
            return Ok(travellers);
        }

        // GET: api/travellers/{nic}
        //Get a traveler profile by NIC
        [HttpGet("{nic}")]
        public async Task<ActionResult<Traveller>> GetByNIC(string nic)
        {
            var traveller = await _travellerServices.GetByNICAsync(nic);
            return Ok(traveller);
        }

        // POST: api/travellers
        //Create new traveler profile
        [HttpPost]
        public async Task<IActionResult> CreateProfile([FromBody] Traveller traveller)
        {
            await _travellerServices.createTravellerProfile(traveller);
            return CreatedAtAction(nameof(GetAll), new { id = traveller.Id }, traveller);
        }

        // PUT: api/travellers/{nic}
        //Update existing traveler profile
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
        // Delete an existing traveler profile
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
        //Login to a traveler account
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
        // Activate a deactivated traveler account
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
        //Deactivate an existing traveler account
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
