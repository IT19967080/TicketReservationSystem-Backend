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
        [HttpGet("{nic:length(24)}")]
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
        [HttpPut("{nic:length(24)}")]
        public async Task<IActionResult> UpdateProfile(string nic, Traveller traveller)
        {
            var existingTraveller = await _travellerServices.GetByNICAsync(nic);
            if (existingTraveller == null)
            {
                return NotFound();
            }
            traveller.Id = existingTraveller.Id;
            await _travellerServices.updateTravellerProfile(nic, traveller);
            return Ok("Updated Succesfully");
        }

        // DELETE: api/travellers/{nic}
        [HttpDelete("{id}")]
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


    }
}
