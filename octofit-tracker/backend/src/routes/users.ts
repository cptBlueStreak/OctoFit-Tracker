import { Router, Request, Response } from 'express'

const router = Router()

// List users
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List users (placeholder)', users: [] })
})

// Create user
router.post('/', (req: Request, res: Response) => {
  const user = req.body
  res.status(201).json({ message: 'Create user (placeholder)', user })
})

export default router
