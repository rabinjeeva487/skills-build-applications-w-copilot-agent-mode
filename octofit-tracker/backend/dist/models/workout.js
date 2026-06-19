"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    focus: { type: String, enum: ['Endurance', 'Strength', 'Mobility', 'Fat Burn'], required: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    intensity: { type: String, enum: ['Low', 'Moderate', 'High'], required: true },
    targetSkillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
}, { timestamps: true });
const WorkoutModel = (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = WorkoutModel;
