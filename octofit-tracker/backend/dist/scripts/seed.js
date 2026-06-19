"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const team_1 = __importDefault(require("../models/team"));
const user_1 = __importDefault(require("../models/user"));
const workout_1 = __importDefault(require("../models/workout"));
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const seed = async () => {
    // Seed the octofit_db database with test data
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        user_1.default.deleteMany({}),
        team_1.default.deleteMany({}),
        activity_1.default.deleteMany({}),
        leaderboard_1.default.deleteMany({}),
        workout_1.default.deleteMany({}),
    ]);
    const users = await user_1.default.insertMany([
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
    await team_1.default.insertMany([
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
    await activity_1.default.insertMany([
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
    await leaderboard_1.default.insertMany([
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
    await workout_1.default.insertMany([
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
    await mongoose_1.default.disconnect();
};
seed().catch(async (error) => {
    console.error('Seeding failed:', error);
    await mongoose_1.default.disconnect();
    process.exit(1);
});
