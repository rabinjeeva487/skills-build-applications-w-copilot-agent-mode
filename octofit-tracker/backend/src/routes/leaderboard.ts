import { Router } from 'express';
import LeaderboardModel from '../models/leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const items = await LeaderboardModel.find()
      .sort({ rank: 1 })
      .populate('userId', 'name email')
      .lean();

    res.json({
      resource: 'leaderboard',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default leaderboardRouter;
