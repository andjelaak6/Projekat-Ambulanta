using System.Collections.Generic;
using System.Threading.Tasks;
using Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace Covid_BE.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LekController : ControllerBase
    {
       
        public ProjekatContext context { get; set; }

        public LekController(ProjekatContext context)
        {
            this.context = context;
        }
        
        [Route("Lekovi")]
        [HttpGet]
        public async Task<JsonResult> VratiLekove() {
            var lekovi = await this.context.Lekovi.ToListAsync();
            return new JsonResult(lekovi);
        }
    }
}