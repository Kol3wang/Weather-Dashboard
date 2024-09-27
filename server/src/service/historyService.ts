import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.name = name;
    this.id = uuidv4(); // Generate a unique ID for each city
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  private filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, '../data/searchHistory.json');
  }

  // Read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf8');
      return JSON.parse(data) as City[];
    } catch (error) {
      // If the file doesn't exist or is empty, return an empty array
      if (error.code === 'ENOENT') return [];
      throw error;
    }
  }

  // Write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    const data = JSON.stringify(cities, null, 2); // Pretty-print JSON
    await fs.promises.writeFile(this.filePath, data, 'utf8');
  }

  // Get cities from the searchHistory.json file and return them as an array of City objects
  public async getCities(): Promise<City[]> {
    return await this.read();
  }

  // Add a city to the searchHistory.json file
  public async addCity(cityName: string): Promise<City> {
    const cities = await this.read();

    // Check if the city already exists in the history
    if (cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
      throw new Error('City already exists in the search history.');
    }

    const newCity = new City(cityName);
    cities.push(newCity);

    await this.write(cities);

    return newCity;
  }

  // BONUS: Remove a city from the searchHistory.json file by id
  public async removeCity(id: string): Promise<void> {
    let cities = await this.read();

    // Filter out the city with the given id
    cities = cities.filter(city => city.id !== id);

    await this.write(cities);
  }
  // async removeCity(id: string) {}
}

export default new HistoryService();
