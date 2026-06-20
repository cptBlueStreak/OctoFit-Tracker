"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.getAllowedOrigins = exports.getHost = exports.getCodespaceApiUrl = exports.PORT = void 0;
exports.start = start;
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const database_1 = require("./config/database");
exports.PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const getCodespaceApiUrl = () => {
    return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : null;
};
exports.getCodespaceApiUrl = getCodespaceApiUrl;
const getHost = () => {
    return codespaceName ? '0.0.0.0' : 'localhost';
};
exports.getHost = getHost;
const getAllowedOrigins = () => {
    const allowedOrigins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173'
    ];
    if (codespaceName) {
        allowedOrigins.push(`https://${codespaceName}-5173.app.github.dev`);
        allowedOrigins.push(`https://${codespaceName}-8000.app.github.dev`);
    }
    return allowedOrigins;
};
exports.getAllowedOrigins = getAllowedOrigins;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((req, res, next) => {
    const allowedOrigins = (0, exports.getAllowedOrigins)();
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
exports.app.use('/api/users', users_1.default);
exports.app.use('/api/teams', teams_1.default);
exports.app.use('/api/activities', activities_1.default);
exports.app.use('/api/leaderboard', leaderboard_1.default);
exports.app.use('/api/workouts', workouts_1.default);
exports.app.get('/', (_req, res) => {
    res.send('OctoFit Tracker backend is running');
});
async function start() {
    await (0, database_1.connectDb)();
    const codespaceApiUrl = (0, exports.getCodespaceApiUrl)();
    if (codespaceApiUrl) {
        console.log(`Codespaces detected. API external URL: ${codespaceApiUrl}`);
    }
    const host = (0, exports.getHost)();
    exports.app.listen(exports.PORT, host, () => console.log(`Server listening on ${host}:${exports.PORT}`));
}
