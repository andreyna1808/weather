using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WeatherApi.Services; 

namespace WeatherApi.Controllers
{
    [ApiController]
    [Route("weatherforecast")]
    public class WeatherController : ControllerBase
    {
        private readonly WeatherService _weatherService;

        public WeatherController(WeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        [HttpGet]
        public IActionResult GetWeatherForecast(
            int? pageSize,
            int? page,
            DateTime? date,
            string? city,
            string? lang
        )
        {
            var result = _weatherService.GetWeatherForecast(pageSize, page, date, city, lang);
            return Ok(result);
        }
    }
}
