"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
// List users
router.get('/', async (_req, res) => {
    const users = await user_1.default.find().limit(100).lean();
    res.json({ users });
});
// Create user
router.post('/', async (req, res) => {
    const payload = req.body;
    const user = new user_1.default(payload);
    await user.save();
    res.status(201).json({ user });
});
exports.default = router;
