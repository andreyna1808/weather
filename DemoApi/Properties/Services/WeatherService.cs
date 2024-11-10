using System;
using System.Collections.Generic;
using System.Linq;
using WeatherApi.Models;

namespace WeatherApi.Services
{
    public class WeatherService
    {
        private readonly string[] cities = new[]
        {
            "São Paulo",
            "Rio de Janeiro",
            "Salvador",
            "Brasília",
            "Curitiba",
            "Mato Grosso"
        };

        private readonly Dictionary<string, string[]> summariesByLanguage =
            new()
            {
                {
                    "pt",
                    new[] { "Congelante", "Frio", "Ameno", "Morno", "Quente", "Muito Quente" }
                },
                {
                    "en",
                    new[]
                    {
                        "Freezing",
                        "Bracing",
                        "Chilly",
                        "Cool",
                        "Mild",
                        "Warm",
                        "Hot",
                        "Sweltering",
                    }
                },
            };

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

            var summaries = summariesByLanguage.ContainsKey(lang)
                ? summariesByLanguage[lang]
                : summariesByLanguage["pt"];

            var forecasts = Enumerable
                .Range(1, 30)
                .Select(index => new WeatherForecast(
                    DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    Random.Shared.Next(-20, 55),
                    summaries[Random.Shared.Next(summaries.Length)],
                    cities[Random.Shared.Next(cities.Length)]
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
                    .Where(f => f.City.Equals(city, StringComparison.OrdinalIgnoreCase))
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
