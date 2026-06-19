import { Schema, model, Types } from 'mongoose'

interface ITeam {
  name: string
  members?: Types.ObjectId[]
  points?: number
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  points: { type: Number, default: 0 }
})

export default model<ITeam>('Team', teamSchema)
