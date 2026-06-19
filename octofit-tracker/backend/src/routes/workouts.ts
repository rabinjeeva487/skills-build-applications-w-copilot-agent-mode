import { Router } from 'express';
import WorkoutModel from '../models/workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const items = await WorkoutModel.find().lean();
    res.json({
      resource: 'workouts',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch workouts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default workoutsRouter;
