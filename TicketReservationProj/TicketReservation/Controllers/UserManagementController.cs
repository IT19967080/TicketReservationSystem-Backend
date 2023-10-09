using Microsoft.AspNetCore.Mvc;
using ticketreservation.Models; // Make sure to import your model namespace
using ticketreservation.Services;

namespace ticketreservation.Controllers
{
    [Route("api/userdata")]
    [ApiController]
    public class UserManagemntController : ControllerBase
    {
        private readonly UserManagemntServices _userServices;

        public UserManagemntController(UserManagemntServices userServices)
        {
            _userServices = userServices;
        }



        // POST: api/train
        [HttpPost]
        public async Task<IActionResult> Register(UserModel newmodel)
        {
            var existingUser = await _userServices.GetUserByUsername(newmodel.UserName);
       
            if (existingUser != null)
            {
                // If a user with the same username already exists, return a conflict response
                var customResponse = new
                {
                    Message = "Username already exists",
                    Status = "Error" // You can include additional status information if needed
                };

                return StatusCode(StatusCodes.Status200OK, customResponse);
            }
            await _userServices.RegisterUser(newmodel);
            return Ok("Updated Succesfully");
            //return CreatedAtAction(nameof(Get), new { id = newmodel.Id }, newmodel);
        }

        //[HttpPost("login")]
        //public async Task<IActionResult> Login(UserModel newmodel)
        //{
            
        //    return Ok("Updated Succesfully");
        //    //return CreatedAtAction(nameof(Get), new { id = newmodel.Id }, newmodel);
        //}

    }
}
