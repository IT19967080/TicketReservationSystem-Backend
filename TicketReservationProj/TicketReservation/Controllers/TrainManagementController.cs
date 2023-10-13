/*
 * File: TrainManagemntController.cs
 * Description: Controller for managing train management operations.
 */

using Microsoft.AspNetCore.Mvc;
using ticketreservation.Models; // Make sure to import your model namespace
using ticketreservation.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

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
            // Retrieve a list of trains
            var trains = await _trainServices.GetAsync();
            return Ok(trains);
        }

        // GET: api/train/{id}
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Train>> GetById(string id)
        {
            // Retrieve a train by its ID
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
            // Create a new train
            await _trainServices.createAsync(newTrain);
            return CreatedAtAction(nameof(Get), new { id = newTrain.Id }, newTrain);
        }

        // PUT: api/train/{id}
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Train updatedTrain)
        {
            // Retrieve the existing train by ID
            var existingTrain = await _trainServices.GetAsync(id);
            if (existingTrain == null)
            {
                return NotFound();
            }
            // Update the train
            updatedTrain.Id = existingTrain.Id;
            await _trainServices.updateAsync(id, updatedTrain);
            return Ok("Updated Successfully");
        }

        // DELETE: api/train/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            // Retrieve the existing train by ID
            var existingTrain = await _trainServices.GetAsync(id);
            if (existingTrain == null)
            {
                return NotFound();
            }
            // Delete the train
            await _trainServices.deleteAsync(id);
            return Ok("Deleted Successfully");
        }
    }
}
