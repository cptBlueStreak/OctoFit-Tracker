"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0 },
    createdAt: { type: Date, default: () => new Date() }
});
exports.default = (0, mongoose_1.model)('User', userSchema);
