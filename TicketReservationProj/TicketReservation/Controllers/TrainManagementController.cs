using Microsoft.AspNetCore.Mvc;
using ticketreservation.Models; // Make sure to import your model namespace
using ticketreservation.Services;

namespace ticketreservation.Controllers
{
    [Route("api/train")]
    [ApiController]
    public class TrainManagemntController : ControllerBase
    {
        private readonly TrainServices _trainServices;

        public TrainManagemntController(TrainServices trainServices)
        {
            _trainServices = trainServices;
        }

        // GET: api/train
        [HttpGet]
        public async Task<ActionResult<List<Train>>> Get()
        {
            var trains = await _trainServices.GetAsync();
            return Ok(trains);
        }

        // GET: api/train/{id}
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Train>> GetById(string id)
        {
            var train = await _trainServices.GetAsync(id);
            if (train == null)
            {
                return NotFound();
            }
            return Ok(train);
        }

        // POST: api/train
        [HttpPost]
        public async Task<IActionResult> Create(Train newTrain)
        {
            await _trainServices.createAsync(newTrain);
            return CreatedAtAction(nameof(Get), new { id = newTrain.Id }, newTrain);
        }

        // PUT: api/train/{id}
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Train updatedTrain)
        {
            var existingTrain = await _trainServices.GetAsync(id);
            if (existingTrain == null)
            {
                return NotFound();
            }
            updatedTrain.Id = existingTrain.Id;
            await _trainServices.updateAsync(id, updatedTrain);
            return Ok("Updated Succesfully");
        }

        // DELETE: api/train/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existingTrain = await _trainServices.GetAsync(id);
            if (existingTrain == null)
            {
                return NotFound();
            }
            await _trainServices.deleteAsync(id);
            return Ok("Deleted Succesfully");
        }
    }
}
