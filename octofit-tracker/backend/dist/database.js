"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = void 0;
exports.connectDb = connectDb;
exports.disconnectDb = disconnectDb;
const mongoose_1 = __importDefault(require("mongoose"));
const DEFAULT_DB_NAME = 'octofit_db';
const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = '27017';
exports.MONGODB_URI = process.env.MONGODB_URI ||
    `mongodb://${process.env.MONGODB_HOST || DEFAULT_HOST}:${process.env.MONGODB_PORT || DEFAULT_PORT}/${process.env.MONGODB_DATABASE || DEFAULT_DB_NAME}`;
async function connectDb() {
    await mongoose_1.default.connect(exports.MONGODB_URI);
    console.log(`Connected to MongoDB at ${exports.MONGODB_URI}`);
}
async function disconnectDb() {
    await mongoose_1.default.disconnect();
    console.log('Disconnected from MongoDB');
}
