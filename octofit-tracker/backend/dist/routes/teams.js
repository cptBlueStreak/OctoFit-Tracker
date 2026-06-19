"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = __importDefault(require("../models/team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await team_1.default.find().populate('members').lean();
    res.json({ teams });
});
router.post('/', async (req, res) => {
    const tm = new team_1.default(req.body);
    await tm.save();
    res.status(201).json({ team: tm });
});
exports.default = router;
