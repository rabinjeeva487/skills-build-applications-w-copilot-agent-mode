"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    weeklyGoalMinutes: { type: Number, required: true, min: 30 },
}, { timestamps: true });
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
