import { Schema, model, Types } from 'mongoose'

interface IWorkout {
  name: string
  user: Types.ObjectId
  activities?: Types.ObjectId[]
  durationMinutes?: number
  calories?: number
  date?: Date
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  durationMinutes: Number,
  calories: Number,
  date: { type: Date, default: () => new Date() }
})

export default model<IWorkout>('Workout', workoutSchema)
