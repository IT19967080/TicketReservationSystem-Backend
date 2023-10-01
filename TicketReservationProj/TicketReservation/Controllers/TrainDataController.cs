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
        private readonly ILogger<TrainDataController> _logger;

        public TrainDataController(TrainDataServices trainDataServices, ILogger<TrainDataController> logger)
        {
            _trainDataServices = trainDataServices;
            _logger = logger;
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

        public async Task<IActionResult> Create(TrainData newTrain)
        {
            try
            {
                // Validate the incoming data (you can use data annotations or FluentValidation).
                if (newTrain == null)
                {
                    _logger.LogError("Invalid data. The train data is missing.");
                    return BadRequest("Invalid data. The train data is missing.");
                }

                // Attempt to create the new train data.
                await _trainDataServices.createAsync(newTrain);

                // Return a 201 Created response with the newly created train data.
                return CreatedAtAction(nameof(Get), new { id = newTrain.Id }, newTrain);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging and analysis purposes.
                // You may also want to consider returning a custom error response.
                // For simplicity, here we return a 500 Internal Server Error.
                _logger.LogError($"An error occurred: {ex.Message}");
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
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
