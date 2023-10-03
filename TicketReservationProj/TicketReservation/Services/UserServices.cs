using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketReservation.Services
{
    public class UserServices : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
