using System.Collections.Generic;

namespace WeatherApi.Models
{
    public static class WeatherSummaries
    {
        public static readonly Dictionary<string, string[]> SummariesByLanguage = new()
        {
            {
                "pt",
                new[] { "Congelante", "Frio", "Ameno", "Morno", "Quente", "Muito Quente" }
            },
            {
                "en",
                new[] { "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Hot", "Sweltering" }
            }
        };
    }
}
