import { Schema, model, Types } from 'mongoose'

interface IActivity {
  type: string
  description?: string
  calories?: number
  durationMinutes?: number
  user: Types.ObjectId
  date?: Date
}

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  description: String,
  calories: Number,
  durationMinutes: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: () => new Date() }
})

export default model<IActivity>('Activity', activitySchema)
