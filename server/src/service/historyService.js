import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
// TODO: Define a City class with name and id properties
class City {
    constructor(name) {
        this.name = name;
        this.id = uuidv4(); // Generate a unique ID for each city
    }
}
// TODO: Complete the HistoryService class
class HistoryService {
    constructor() {
        this.filePath = path.join(__dirname, '../data/searchHistory.json');
    }
    // Read method that reads from the searchHistory.json file
    async read() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            // Check if error is an instance of NodeJS.ErrnoException and handle ENOENT
            if (error instanceof Error && error.code === 'ENOENT') {
                return [];
            }
            throw error; // Re-throw the error if it's not the expected type
        }
    }
    // Write method that writes the updated cities array to the searchHistory.json file
    async write(cities) {
        const data = JSON.stringify(cities, null, 2); // Pretty-print JSON
        await fs.promises.writeFile(this.filePath, data, 'utf8');
    }
    // Get cities from the searchHistory.json file and return them as an array of City objects
    async getCities() {
        return await this.read();
    }
    // Add a city to the searchHistory.json file
    async addCity(cityName) {
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
    async removeCity(id) {
        let cities = await this.read();
        // Filter out the city with the given id
        cities = cities.filter(city => city.id !== id);
        await this.write(cities);
    }
}
export default new HistoryService();
