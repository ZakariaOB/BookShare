using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class City
    {
        [Key]
        public int Id {get; set;}
        public string Name {get; set;}
        public Country Country {get; set;}
        public int CountryId {get; set;}
    }
}