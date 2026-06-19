"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['Run', 'Cycle', 'Strength', 'Yoga', 'HIIT'], required: true },
    durationMinutes: { type: Number, required: true, min: 5 },
    caloriesBurned: { type: Number, required: true, min: 10 },
    performedAt: { type: Date, required: true },
}, { timestamps: true });
const ActivityModel = (0, mongoose_1.model)('Activity', activitySchema);
exports.default = ActivityModel;
