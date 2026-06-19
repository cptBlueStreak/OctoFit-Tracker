"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const workouts = await workout_1.default.find().populate('user activities').limit(200).lean();
    res.json({ workouts });
});
router.post('/', async (req, res) => {
    const w = new workout_1.default(req.body);
    await w.save();
    res.status(201).json({ workout: w });
});
exports.default = router;
