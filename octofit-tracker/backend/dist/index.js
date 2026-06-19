"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const database_1 = require("./database");
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
// Basic JSON parsing
app.use(express_1.default.json());
// Simple CORS middleware that allows frontend (5173) and Codespaces preview domain
app.use((req, res, next) => {
    const codespace = process.env.CODESPACE_NAME;
    const allowedOrigins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173'
    ];
    if (codespace) {
        // GitHub Codespaces preview URL pattern (best-effort)
        allowedOrigins.push(`https://${codespace}-5173.githubpreview.dev`);
        allowedOrigins.push(`https://${codespace}-8000.githubpreview.dev`);
    }
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    }
    if (req.method === 'OPTIONS')
        return res.sendStatus(204);
    next();
});
// Mount API routes
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.get('/', (_req, res) => {
    res.send('OctoFit Tracker backend is running');
});
async function start() {
    try {
        await (0, database_1.connectDb)();
        // If running in Codespaces, expose a likely external API URL for previews
        if (process.env.CODESPACE_NAME) {
            const name = process.env.CODESPACE_NAME;
            const apiUrl = `https://${name}-8000.githubpreview.dev`;
            console.log(`Codespaces detected. API external URL (preview): ${apiUrl}`);
        }
        // Bind to 0.0.0.0 so Codespaces port forwarding can reach the server
        const host = process.env.CODESPACE_NAME ? '0.0.0.0' : 'localhost';
        app.listen(PORT, host, () => console.log(`Server listening on ${host}:${PORT}`));
    }
    catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}
start();
