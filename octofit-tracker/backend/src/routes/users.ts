import { Router, Request, Response } from 'express'
import User from '../models/user'

const router = Router()

// List users
router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().limit(100).lean()
  res.json({ users })
})

// Create user
router.post('/', async (req: Request, res: Response) => {
  const payload = req.body
  const user = new User(payload)
  await user.save()
  res.status(201).json({ user })
})

export default router
