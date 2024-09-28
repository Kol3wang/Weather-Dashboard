"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const historyService_js_1 = __importDefault(require("../../service/historyService.js"));
const weatherService_js_1 = __importDefault(require("../../service/weatherService.js"));
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    try {
        // Use explicit casting to access req.body properties
        const { cityName } = req.body;
        if (!cityName) {
            return res.status(400).json({ error: 'City name is required.' });
        }
        // Get weather data from WeatherService
        const weatherData = await weatherService_js_1.default.getWeatherForCity(cityName);
        // Save city to search history
        await historyService_js_1.default.addCity(cityName);
        // Send weather data as response
        res.status(200).json(weatherData);
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to retrieve weather data.' });
    }
});
// GET search history
router.get('/history', async (req, res) => {
    try {
        // Get the list of cities from HistoryService
        const cities = await historyService_js_1.default.getCities();
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
        await historyService_js_1.default.removeCity(id);
        // Send success response
        res.status(200).json({ message: 'City successfully deleted from history.' });
    }
    catch (error) {
        console.error('Error deleting city from history:', error);
        res.status(500).json({ error: 'Failed to delete city from search history.' });
    }
});
exports.default = router;
