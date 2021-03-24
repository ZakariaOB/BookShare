using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

public interface ICountryRepository
{
	Task<IEnumerable<Country>> GetCountries(string search);
}