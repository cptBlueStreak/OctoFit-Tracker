import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List teams (placeholder)', teams: [] })
})

router.post('/', (req: Request, res: Response) => {
  const team = req.body
  res.status(201).json({ message: 'Create team (placeholder)', team })
})

export default router
