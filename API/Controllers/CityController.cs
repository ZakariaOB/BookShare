using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	public class CityController : BaseApiController
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public CityController(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}

		[HttpGet("get-cities-by-country/{countryId}/{search?}")]
		public async Task<IEnumerable<CityDto>> GetCitiesByCountryId(int countryId, string search = null)
		{
			// Call example from the browser : https://localhost:5001/api/city/get-cities-by-country/4
			var cities = await _unitOfWork.CityRepository.GetCitiesByCountryId(countryId, search);
			return _mapper.Map<IEnumerable<CityDto>>(cities);
		}
	}
}