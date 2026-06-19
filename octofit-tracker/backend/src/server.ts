import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

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

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri, {
      dbName: 'octofit_db',
    });

    app.listen(port, () => {
      console.log(`OctoFit backend listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
};

void start();
