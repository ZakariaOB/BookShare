using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
	public class CityRepository : ICityRepository
	{
		private readonly DataContext _context;
		public CityRepository(DataContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<City>> GetCitiesByCountryId(int countryId, string search)
		{
			if (string.IsNullOrWhiteSpace(search))
			{
				return await _context.Cities.Where(c => c.CountryId == countryId).ToListAsync();
			}
			return await _context.Cities.Where(c => c.CountryId == countryId && c.Name.ToLower().StartsWith(search.ToLower())).ToListAsync();
		}
	}
}