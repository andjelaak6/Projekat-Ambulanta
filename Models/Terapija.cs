using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models {
    public class Terapija {

        [Key]
        public int Id { get; set; }

        public Lek Lek { get; set; }

        [StringLength(255, MinimumLength = 10)]
        public string Uputstvo { get; set; }
        
        [JsonIgnore]
        public KartonPacijenta KartonPacijenta { get; set; }
    }
}