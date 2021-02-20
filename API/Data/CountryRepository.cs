using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
	public class CountryRepository : ICountryRepository
	{
		private readonly DataContext _context;
		public CountryRepository(DataContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<Country>> GetCountries(string search)
		{
			if (string.IsNullOrWhiteSpace(search))
			{

				return await _context.Countries.ToListAsync();
			}
			return await _context.Countries.Where(c => c.Name.ToLower().StartsWith(search.ToLower())).ToListAsync();
		}
	}
}