import { Router, Request, Response } from 'express'

const router = Router()

// Simple leaderboard listing
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Leaderboard (placeholder)', leaderboard: [] })
})

export default router
