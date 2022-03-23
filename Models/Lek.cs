using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models {
    public class Lek {
        [Key]
        public int Id { get; set; }
       
        [Required]
        [StringLength(60, MinimumLength = 3)]
        public string Naziv { get; set; }

        [StringLength(60, MinimumLength = 3)]
        public string Proizvodjac { get; set; }
    }
}    