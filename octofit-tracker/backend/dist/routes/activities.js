"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const activitiesRouter = (0, express_1.Router)();
activitiesRouter.get('/', async (_req, res) => {
    try {
        const items = await activity_1.default.find()
            .sort({ performedAt: -1 })
            .populate('userId', 'name email')
            .lean();
        res.json({
            resource: 'activities',
            count: items.length,
            items,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch activities',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = activitiesRouter;
