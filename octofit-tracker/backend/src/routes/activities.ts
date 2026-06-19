import { Router, Request, Response } from 'express'
import Activity from '../models/activity'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user').limit(200).lean()
  res.json({ activities })
})

router.post('/', async (req: Request, res: Response) => {
  const a = new Activity(req.body)
  await a.save()
  res.status(201).json({ activity: a })
})

export default router
