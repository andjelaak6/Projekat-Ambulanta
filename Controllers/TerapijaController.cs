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
    public class TerapijaController : ControllerBase
    {
       
        public ProjekatContext context { get; set; }

        public TerapijaController(ProjekatContext context)
        {
            this.context = context;
        }

        [Route("IzbrisatiTerapiju/TerapijaId={id}")]
        [HttpDelete]
        public async Task Izbrisi(int id)
        {
            var terapija = await this.context.Terapije.FindAsync(id);
            if (terapija != null) {
                this.context.Terapije.Remove(terapija);
                await this.context.SaveChangesAsync();
            } else {
                throw new System.Exception("Ne postoji terapija sa zadatim id-jem.");
            }
        }
        
        [Route("DodajTerapiju/KartonId={id}/LekId={lekId}")]
        [HttpPost]
        public async Task<Terapija> DodajTerapiju(int id, int lekId, [FromBody] Terapija terapija)
        {
            KartonPacijenta pacijent = await this.context.Kartoni.FindAsync(id);
            Lek lek = await this.context.Lekovi.FindAsync(lekId);
            if (pacijent != null && lek != null) {
                terapija.KartonPacijenta = pacijent;
                terapija.Lek = lek;
                this.context.Terapije.Add(terapija);
                await this.context.SaveChangesAsync();
                return terapija;
            } else {
                throw new System.Exception("Karton pacijenta ili lek ne postoji.");
            }
        }  

        [Route("IzmeniTerapiju/TerapijaId={id}")]
        [HttpPut]
        public async Task<Terapija> PromenitiUputstvo(int id, [FromBody] Terapija terapija)
        {
            Terapija postojecaTerapija = await this.context.Terapije.FindAsync(id);
            if (postojecaTerapija != null) {
                postojecaTerapija.Uputstvo = terapija.Uputstvo;
                postojecaTerapija.Lek = terapija.Lek;
                this.context.Terapije.Update(postojecaTerapija);
                await this.context.SaveChangesAsync();
                return postojecaTerapija;
            } else {
                throw new System.Exception("Ne postoji terapija sa zadatim id-jem.");
            }
            
        } 
    }
}