import { connectDatabase, disconnectDatabase } from '../config/database';
import ActivityModel from '../models/activity';
import LeaderboardModel from '../models/leaderboard';
import TeamModel from '../models/team';
import UserModel from '../models/user';
import WorkoutModel from '../models/workout';

const seed = async (): Promise<void> => {
  // Seed the octofit_db database with test data
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.insertMany([
    {
      name: 'Ava Thompson',
      email: 'ava.thompson@octofit.test',
      skillLevel: 'Intermediate',
      weeklyGoalMinutes: 210,
    },
    {
      name: 'Noah Patel',
      email: 'noah.patel@octofit.test',
      skillLevel: 'Advanced',
      weeklyGoalMinutes: 300,
    },
    {
      name: 'Mia Garcia',
      email: 'mia.garcia@octofit.test',
      skillLevel: 'Beginner',
      weeklyGoalMinutes: 150,
    },
  ]);

  await TeamModel.insertMany([
    {
      name: 'Downtown Dashers',
      city: 'Seattle',
      members: [users[0]._id, users[1]._id],
    },
    {
      name: 'Sunrise Circuit Crew',
      city: 'Austin',
      members: [users[1]._id, users[2]._id],
    },
  ]);

  await ActivityModel.insertMany([
    {
      userId: users[0]._id,
      type: 'Run',
      durationMinutes: 45,
      caloriesBurned: 420,
      performedAt: new Date('2026-06-14T07:30:00Z'),
    },
    {
      userId: users[1]._id,
      type: 'Strength',
      durationMinutes: 60,
      caloriesBurned: 510,
      performedAt: new Date('2026-06-15T18:00:00Z'),
    },
    {
      userId: users[2]._id,
      type: 'Yoga',
      durationMinutes: 35,
      caloriesBurned: 180,
      performedAt: new Date('2026-06-16T06:45:00Z'),
    },
  ]);

  await LeaderboardModel.insertMany([
    {
      userId: users[1]._id,
      totalPoints: 1280,
      rank: 1,
      streakDays: 18,
    },
    {
      userId: users[0]._id,
      totalPoints: 1170,
      rank: 2,
      streakDays: 12,
    },
    {
      userId: users[2]._id,
      totalPoints: 760,
      rank: 3,
      streakDays: 6,
    },
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'Tempo Trail Run',
      focus: 'Endurance',
      durationMinutes: 50,
      intensity: 'High',
      targetSkillLevel: 'Intermediate',
    },
    {
      title: 'Power Ladder Strength',
      focus: 'Strength',
      durationMinutes: 40,
      intensity: 'Moderate',
      targetSkillLevel: 'Advanced',
    },
    {
      title: 'Core and Mobility Reset',
      focus: 'Mobility',
      durationMinutes: 30,
      intensity: 'Low',
      targetSkillLevel: 'Beginner',
    },
  ]);

  console.log('Seeding complete.');
  await disconnectDatabase();
};

seed().catch(async (error: unknown) => {
  console.error('Seeding failed:', error);
  await disconnectDatabase();
  process.exit(1);
});
