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
    public class KartonController : ControllerBase
    {
       
        public ProjekatContext context { get; set; }

        public KartonController(ProjekatContext context)
        {
            this.context = context;
        }

        [Route("KartonId={id}/Terapije")]
        [HttpGet]
        public async Task<JsonResult> VratiTerapije(int id) {
            var terapije = await this.context.Terapije.Include(ter => ter.Lek).Where(ter => ter.KartonPacijenta.Id == id).ToListAsync();
            return new JsonResult(terapije);
        }
    }
}