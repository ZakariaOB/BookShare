using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CountryController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CountryController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("get-countries")]
        public async Task<IEnumerable<CountryDto>> GetCountries()
        {
            // Call example from the browser : https://localhost:5001/api/country/get-countries
            var countries = await _unitOfWork.CountryRepository.GetCountries();
            return _mapper.Map<IEnumerable<CountryDto>>(countries);
        }
    }
}