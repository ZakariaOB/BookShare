using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Country
    {
        [Key]
        public int Id {get; set;}
        public string Name {get; set;}
        public ICollection<City> Cities { get; set; } = new List<City>();
    }
}