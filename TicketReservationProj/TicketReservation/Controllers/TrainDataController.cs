using Microsoft.AspNetCore.Mvc;
using ticketreservation.Models; // Make sure to import your model namespace
using ticketreservation.Services;
using TicketReservation.Models;
using TicketReservation.Services;

namespace ticketreservation.Controllers
{
    [Route("api/traindata")]
    [ApiController]
    public class TrainDataController : ControllerBase
    {
        private readonly TrainDataServices _trainDataServices;

        public TrainDataController(TrainDataServices trainDataServices)
        {
            _trainDataServices = trainDataServices;
        }

        // GET: api/traindata
        [HttpGet]
        public async Task<ActionResult<List<TrainData>>> Get()
        {
            var trains = await _trainDataServices.GetAsync();
            return Ok(trains);
        }

        // GET: api/traindata/{id}
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<TrainData>> GetById(string id)
        {
            var train = await _trainDataServices.GetAsync(id);
            if (train == null)
            {
                return NotFound();
            }
            return Ok(train);
        }

        // POST: api/traindata
        [HttpPost]
        public async Task<IActionResult> Create(TrainData newTrain)
        {
            await _trainDataServices.createAsync(newTrain);
            return CreatedAtAction(nameof(Get), new { id = newTrain.Id }, newTrain);
        }

        // PUT: api/traindata/{id}
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, TrainData updatedTrain)
        {
            var existingTrain = await _trainDataServices.GetAsync(id);
            if (existingTrain == null)
            {
                return NotFound();
            }
            updatedTrain.Id = existingTrain.Id;
            await _trainDataServices.updateAsync(id, updatedTrain);
            return Ok("Updated Succesfully");
        }

        // DELETE: api/traindata/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existingTrainData = await _trainDataServices.GetAsync(id);
            if (existingTrainData == null)
            {
                return NotFound();
            }
            await _trainDataServices.deleteAsync(id);
            return Ok("Deleted Succesfully");
        }
    }
}
