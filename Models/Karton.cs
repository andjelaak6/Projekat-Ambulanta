using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models {
        public class KartonPacijenta {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(12, ErrorMessage = "LBO must contain 12 characters.")]
        public string LBO { get; set; }
        
        [Required]
        [StringLength(60, MinimumLength = 3)]
        public string Ime { get; set; }

        [Required]
        [StringLength(60, MinimumLength = 3)]
        public string Prezime { get; set; }   

        [Required]
        public DateTime DatumIzdavanja { get; set; }

        public List<Terapija> Terapije {get; set;}

        [JsonIgnore]
        public KovidAmbulanta Ambulanta {get; set;}
    }
}