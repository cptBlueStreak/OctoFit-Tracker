import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List workouts (placeholder)', workouts: [] })
})

router.post('/', (req: Request, res: Response) => {
  const workout = req.body
  res.status(201).json({ message: 'Create workout (placeholder)', workout })
})

export default router
