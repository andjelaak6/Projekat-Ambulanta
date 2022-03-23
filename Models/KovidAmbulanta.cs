using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Models {
    public class KovidAmbulanta {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(60, MinimumLength = 3)]
        public string Naziv { get; set; } 

        public List<KartonPacijenta> Kartoni {get; set;}
    }
}