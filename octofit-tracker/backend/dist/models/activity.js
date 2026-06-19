"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    description: String,
    calories: Number,
    durationMinutes: Number,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: () => new Date() }
});
exports.default = (0, mongoose_1.model)('Activity', activitySchema);
