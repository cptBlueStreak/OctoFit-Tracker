import { Router, Request, Response } from 'express'
import Team from '../models/team'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members').lean()
  res.json({ teams })
})

router.post('/', async (req: Request, res: Response) => {
  const tm = new Team(req.body)
  await tm.save()
  res.status(201).json({ team: tm })
})

export default router
