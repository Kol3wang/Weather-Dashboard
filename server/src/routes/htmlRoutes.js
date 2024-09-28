"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const node_url_1 = require("node:url");
const express_1 = require("express");
const __filename = (0, node_url_1.fileURLToPath)(import.meta.url);
const __dirname = node_path_1.default.dirname(__filename);
const router = (0, express_1.Router)();
// TODO: Define route to serve index.html
router.get('/', (req, res) => {
    // Assuming index.html is in a directory named "public" in the project root
    const indexPath = node_path_1.default.join(__dirname, '../public/index.html');
    // Serve the index.html file
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.status(500).send('Error serving index.html');
        }
    });
});
exports.default = router;
