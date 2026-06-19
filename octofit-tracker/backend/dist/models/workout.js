"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    activities: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Activity' }],
    durationMinutes: Number,
    calories: Number,
    date: { type: Date, default: () => new Date() }
});
exports.default = (0, mongoose_1.model)('Workout', workoutSchema);
