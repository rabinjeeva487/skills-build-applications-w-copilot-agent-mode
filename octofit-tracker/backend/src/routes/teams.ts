import { Router } from 'express';
import TeamModel from '../models/team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const items = await TeamModel.find().populate('members', 'name email skillLevel').lean();
    res.json({
      resource: 'teams',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch teams',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default teamsRouter;
