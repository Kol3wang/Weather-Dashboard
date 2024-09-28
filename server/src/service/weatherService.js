"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// TODO: Define a class for the Weather object
class Weather {
    constructor(city, date, temperature, windSpeed, humidity, description, icon) {
        this.city = city;
        this.date = date;
        this.temperature = temperature;
        this.windSpeed = windSpeed;
        this.humidity = humidity;
        this.description = description;
        this.icon = icon;
    }
}
// TODO: Complete the WeatherService class
class WeatherService {
    constructor() {
        // TODO: Define the baseURL, API key, and city name properties
        // TODO: Create fetchLocationData method
        // private async fetchLocationData(query: string) {}
        // TODO: Create destructureLocationData method
        // private destructureLocationData(locationData: Coordinates): Coordinates {}
        // TODO: Create buildGeocodeQuery method
        // private buildGeocodeQuery(): string {}
        // TODO: Create buildWeatherQuery method
        // private buildWeatherQuery(coordinates: Coordinates): string {}
        // TODO: Create fetchAndDestructureLocationData method
        // private async fetchAndDestructureLocationData() {}
        // TODO: Create fetchWeatherData method
        // private async fetchWeatherData(coordinates: Coordinates) {}
        // TODO: Build parseCurrentWeather method
        // private parseCurrentWeather(response: any) {}
        // TODO: Complete buildForecastArray method
        // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
        // TODO: Complete getWeatherForCity method
        // async getWeatherForCity(city: string) {}
        this.baseURL = 'https://api.openweathermap.org/data/2.5/';
        this.apiKey = process.env.API_KEY || ''; // Ensure API_KEY is set in your .env file
        this.cityName = '';
    }
    // Fetch location data (latitude and longitude) based on city name
    async fetchLocationData(query) {
        const url = `${this.baseURL}weather?q=${query}&appid=${this.apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    // Destructure location data to extract coordinates
    destructureLocationData(locationData) {
        return {
            latitude: locationData.coord.lat,
            longitude: locationData.coord.lon,
        };
    }
    // Build query string for weather data API based on coordinates
    buildWeatherQuery(coordinates) {
        return `onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude=minutely,hourly&units=imperial&appid=${this.apiKey}`;
    }
    // Fetch and destructure location data in one step
    async fetchAndDestructureLocationData() {
        const locationData = await this.fetchLocationData(this.cityName);
        return this.destructureLocationData(locationData);
    }
    // Fetch weather data based on coordinates
    async fetchWeatherData(coordinates) {
        const url = `${this.baseURL}${this.buildWeatherQuery(coordinates)}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    // Parse current weather data from API response
    parseCurrentWeather(response) {
        const city = response.timezone;
        const current = response.current;
        const date = new Date(current.dt * 1000).toLocaleDateString();
        const temperature = current.temp;
        const windSpeed = current.wind_speed;
        const humidity = current.humidity;
        const description = current.weather[0].description;
        const icon = current.weather[0].icon;
        return new Weather(city, date, temperature, windSpeed, humidity, description, icon);
    }
    // Build an array of forecast data from API response
    buildForecastArray(weather, weatherData) {
        return weatherData.map((day) => {
            const date = new Date(day.dt * 1000).toLocaleDateString();
            return new Weather(weather.city, date, day.temp.day, day.wind_speed, day.humidity, day.weather[0].description, day.weather[0].icon);
        });
    }
    // Get weather data for a given city
    async getWeatherForCity(city) {
        this.cityName = city;
        const coordinates = await this.fetchAndDestructureLocationData();
        const weatherData = await this.fetchWeatherData(coordinates);
        const currentWeather = this.parseCurrentWeather(weatherData);
        const forecast = this.buildForecastArray(currentWeather, weatherData.daily.slice(1, 6)); // Get 5-day forecast
        return { currentWeather, forecast };
    }
}
exports.default = new WeatherService();
