using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

public interface ICityRepository
{
	Task<IEnumerable<City>> GetCitiesByCountryId(int countryId, string search);
}