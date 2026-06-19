import { Schema, model, Types } from 'mongoose'

interface ILeaderboardEntry {
  user: Types.ObjectId
  rank: number
  points: number
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  points: { type: Number, required: true }
})

export default model<ILeaderboardEntry>('Leaderboard', leaderboardSchema)
