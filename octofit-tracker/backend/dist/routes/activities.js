"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await activity_1.default.find().populate('user').limit(200).lean();
    res.json({ activities });
});
router.post('/', async (req, res) => {
    const a = new activity_1.default(req.body);
    await a.save();
    res.status(201).json({ activity: a });
});
exports.default = router;
