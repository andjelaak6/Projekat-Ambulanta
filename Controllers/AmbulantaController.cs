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
    public class AmbulantaController : ControllerBase
    {
       
        public ProjekatContext context { get; set; }

        public AmbulantaController(ProjekatContext context)
        {
            this.context = context;
        }

        [Route("Ambulante")]
        [HttpGet]
        public async Task<JsonResult> VratiAmbulante() {
            var ambulante = await this.context.Ambulante.ToListAsync();
            return new JsonResult(ambulante);
        }

        [Route("AmbulantaId={id}")]
        [HttpGet]
        public async Task<JsonResult> VratiAmbulantu(int id) {
            var ambulanta = await this.context.Ambulante.Include(amb => amb.Kartoni).FirstOrDefaultAsync(amb => amb.Id == id);
            return new JsonResult(ambulanta);
        }

        [Route("DodajKarton/AmbulantaId={id}")]
        [HttpPost]
        public async Task<KartonPacijenta> DodajPacijenta(int id, [FromBody] KartonPacijenta karton)
        {
            KovidAmbulanta ambulanta = await this.context.Ambulante.FindAsync(id);
            if (ambulanta == null) {
                throw new System.Exception("Ambulanta ne postoji.");
            } else {
                karton.Ambulanta = ambulanta;
                this.context.Kartoni.Add(karton);
                await this.context.SaveChangesAsync();
                return karton;
            }
        }
    
        [Route("IzbrisatiKarton/KartonId={id}")]
        [HttpDelete]
        public async Task IzbrisiKarton(int id)
        {
            KartonPacijenta pacijent = this.context.Kartoni.Include(kart => kart.Terapije).FirstOrDefault(k => k.Id == id);
            if (pacijent != null) {
                this.context.Kartoni.Remove(pacijent);
                await this.context.SaveChangesAsync();
            } else {
                throw new System.Exception("Karton ne postoji.");
            }
        }
    }
}