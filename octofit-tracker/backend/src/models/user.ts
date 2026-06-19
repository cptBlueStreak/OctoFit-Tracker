import { Schema, model, Types } from 'mongoose'

interface IUser {
  name: string
  email: string
  role?: string
  team?: Types.ObjectId
  points?: number
  createdAt?: Date
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() }
})

export default model<IUser>('User', userSchema)
