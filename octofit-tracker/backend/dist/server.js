"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        baseUrl,
        mongoDbPort: 27017,
    });
});
const start = async () => {
    try {
        await mongoose_1.default.connect(mongoUri, {
            dbName: 'octofit_db',
        });
        app.listen(port, () => {
            console.log(`OctoFit backend listening on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
};
void start();
