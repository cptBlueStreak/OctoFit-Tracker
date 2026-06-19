import mongoose from 'mongoose'

const DEFAULT_DB_NAME = 'octofit_db'
const DEFAULT_HOST = 'localhost'
const DEFAULT_PORT = '27017'

export const MONGODB_URI = process.env.MONGODB_URI ||
  `mongodb://${process.env.MONGODB_HOST || DEFAULT_HOST}:${process.env.MONGODB_PORT || DEFAULT_PORT}/${process.env.MONGODB_DATABASE || DEFAULT_DB_NAME}`

export async function connectDb() {
  await mongoose.connect(MONGODB_URI)
  console.log(`Connected to MongoDB at ${MONGODB_URI}`)
}

export async function disconnectDb() {
  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')
}
