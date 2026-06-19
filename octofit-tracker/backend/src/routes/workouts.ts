import { Router, Request, Response } from 'express'
import Workout from '../models/workout'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().populate('user activities').limit(200).lean()
  res.json({ workouts })
})

router.post('/', async (req: Request, res: Response) => {
  const w = new Workout(req.body)
  await w.save()
  res.status(201).json({ workout: w })
})

export default router
