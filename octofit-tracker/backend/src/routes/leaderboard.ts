import { Router, Request, Response } from 'express'
import Leaderboard from '../models/leaderboard'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const leaderboard = await Leaderboard.find().populate('user').sort({ rank: 1 }).limit(100).lean()
  res.json({ leaderboard })
})

export default router
