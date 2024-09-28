import { Router } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    try {
        const { cityName } = req.body;
        if (!cityName) {
            // Return a response if cityName is not provided
            return res.status(400).json({ error: 'City name is required.' });
        }
        // Get weather data from WeatherService
        const weatherData = await WeatherService.getWeatherForCity(cityName);
        // Save city to search history
        await HistoryService.addCity(cityName);
        // Send weather data as response
        return res.status(200).json(weatherData); // Ensure return is used here
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        // Return error response to the client
        return res.status(500).json({ error: 'Failed to retrieve weather data.' });
    }
});
// GET search history
router.get('/history', async (_req, res) => {
    try {
        // Get the list of cities from HistoryService
        const cities = await HistoryService.getCities();
        res.status(200).json(cities);
    }
    catch (error) {
        console.error('Error retrieving search history:', error);
        res.status(500).json({ error: 'Failed to retrieve search history.' });
    }
});
// BONUS: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Remove city from search history using the ID
        await HistoryService.removeCity(id);
        // Send success response
        res.status(200).json({ message: 'City successfully deleted from history.' });
    }
    catch (error) {
        console.error('Error deleting city from history:', error);
        res.status(500).json({ error: 'Failed to delete city from search history.' });
    }
});
export default router;
