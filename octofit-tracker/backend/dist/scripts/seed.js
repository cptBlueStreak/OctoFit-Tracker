"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const workout_1 = __importDefault(require("../models/workout"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const database_1 = require("../config/database");
async function seed() {
    await (0, database_1.connectDb)();
    console.log('Seed the octofit_db database with test data');
    // Clear existing data
    await Promise.all([
        user_1.default.deleteMany({}),
        team_1.default.deleteMany({}),
        activity_1.default.deleteMany({}),
        workout_1.default.deleteMany({}),
        leaderboard_1.default.deleteMany({})
    ]);
    // Create teams
    const teamA = await team_1.default.create({ name: 'Seaside Sprinters' });
    const teamB = await team_1.default.create({ name: 'Mountain Movers' });
    // Create users
    const users = await user_1.default.create([
        { name: 'Ava Park', email: 'ava@example.com', role: 'captain', team: teamA._id, points: 420 },
        { name: 'Liam Chen', email: 'liam@example.com', team: teamA._id, points: 380 },
        { name: 'Maya Singh', email: 'maya@example.com', team: teamB._id, points: 450 },
        { name: 'Noah Patel', email: 'noah@example.com', team: teamB._id, points: 310 }
    ]);
    // Attach members to teams
    teamA.members = [users[0]._id, users[1]._id];
    teamB.members = [users[2]._id, users[3]._id];
    await teamA.save();
    await teamB.save();
    // Activities
    const activities = await activity_1.default.create([
        { type: 'run', description: 'Morning 5k', calories: 320, durationMinutes: 28, user: users[0]._id },
        { type: 'cycle', description: 'Evening ride', calories: 420, durationMinutes: 45, user: users[1]._id },
        { type: 'swim', description: 'Lap session', calories: 250, durationMinutes: 30, user: users[2]._id },
        { type: 'yoga', description: 'Stretch and core', calories: 120, durationMinutes: 40, user: users[3]._id }
    ]);
    // Workouts
    await workout_1.default.create([
        { name: 'Ava Morning Run', user: users[0]._id, activities: [activities[0]._id], durationMinutes: 28, calories: 320 },
        { name: 'Liam Ride', user: users[1]._id, activities: [activities[1]._id], durationMinutes: 45, calories: 420 }
    ]);
    // Leaderboard
    await leaderboard_1.default.create([
        { user: users[2]._id, rank: 1, points: users[2].points || 0 },
        { user: users[0]._id, rank: 2, points: users[0].points || 0 },
        { user: users[1]._id, rank: 3, points: users[1].points || 0 }
    ]);
    console.log('Seeding complete');
    await (0, database_1.disconnectDb)();
}
seed().catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
