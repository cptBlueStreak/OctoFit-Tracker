import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List activities (placeholder)', activities: [] })
})

router.post('/', (req: Request, res: Response) => {
  const activity = req.body
  res.status(201).json({ message: 'Create activity (placeholder)', activity })
})

export default router
