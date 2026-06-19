import { Router } from 'express';
import ActivityModel from '../models/activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const items = await ActivityModel.find()
      .sort({ performedAt: -1 })
      .populate('userId', 'name email')
      .lean();

    res.json({
      resource: 'activities',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch activities',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default activitiesRouter;
