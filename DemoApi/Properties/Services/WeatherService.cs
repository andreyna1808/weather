using System;
using System.Collections.Generic;
using System.Linq;
using WeatherApi.Models;
using WeatherApi.Data;

namespace WeatherApi.Services
{
    public class WeatherService
    {
        private readonly string[] states = BrazilianStates.States;

        public IEnumerable<WeatherForecast> GetWeatherForecast(
            int? pageSize,
            int? page,
            DateTime? date,
            string? city,
            string? lang
        )
        {
            pageSize ??= 5;
            page ??= 1;
            lang ??= "pt";

            var summaries = WeatherSummaries.SummariesByLanguage.ContainsKey(lang)
                ? WeatherSummaries.SummariesByLanguage[lang]
                : WeatherSummaries.SummariesByLanguage["pt"];

            var forecasts = Enumerable
                .Range(1, 30)
                .Select(index => new WeatherForecast(
                    DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    Random.Shared.Next(-20, 55),
                    summaries[Random.Shared.Next(summaries.Length)],
                    states[Random.Shared.Next(states.Length)]
                ))
                .ToList();

            if (date.HasValue)
            {
                forecasts = forecasts
                    .Where(f => f.Date == DateOnly.FromDateTime(date.Value))
                    .ToList();
            }

            if (!string.IsNullOrEmpty(city))
            {
                forecasts = forecasts
                    .Where(f => f.City.Contains(city, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            var paginatedResult = forecasts
                .Skip((page.Value - 1) * pageSize.Value)
                .Take(pageSize.Value)
                .ToArray();

            return paginatedResult;
        }
    }
}
