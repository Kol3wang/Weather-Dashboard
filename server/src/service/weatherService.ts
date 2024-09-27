import dotenv from 'dotenv';

dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  description: string;
  icon: string;

  constructor(city: string, date: string, temperature: number, windSpeed: number, humidity: number, description: string, icon: string) {
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
  private baseURL: string = 'https://api.openweathermap.org/data/2.5/';
  private apiKey: string = process.env.API_KEY || ''; // Ensure API_KEY is set in your .env file
  private cityName: string = '';

  // Fetch location data (latitude and longitude) based on city name
  private async fetchLocationData(query: string): Promise<any> {
    const url = `${this.baseURL}weather?q=${query}&appid=${this.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  // Destructure location data to extract coordinates
  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.coord.lat,
      longitude: locationData.coord.lon,
    };
  }

  // Build query string for geocoding API
  private buildGeocodeQuery(): string {
    return `weather?q=${this.cityName}&appid=${this.apiKey}`;
  }

  // Build query string for weather data API based on coordinates
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude=minutely,hourly&units=imperial&appid=${this.apiKey}`;
  }

  // Fetch and destructure location data in one step
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }

  // Fetch weather data based on coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = `${this.baseURL}${this.buildWeatherQuery(coordinates)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  // Parse current weather data from API response
  private parseCurrentWeather(response: any): Weather {
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
  private buildForecastArray(weather: Weather, weatherData: any[]): Weather[] {
    return weatherData.map((day: any) => {
      const date = new Date(day.dt * 1000).toLocaleDateString();
      return new Weather(
        weather.city,
        date,
        day.temp.day,
        day.wind_speed,
        day.humidity,
        day.weather[0].description,
        day.weather[0].icon
      );
    });
  }

  // Get weather data for a given city
  public async getWeatherForCity(city: string): Promise<{ currentWeather: Weather; forecast: Weather[] }> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecast = this.buildForecastArray(currentWeather, weatherData.daily.slice(1, 6)); // Get 5-day forecast

    return { currentWeather, forecast };
  }
}

export default new WeatherService();
