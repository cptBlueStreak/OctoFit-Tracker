import express from 'express'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'
import { connectDb } from './config/database'

export const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const codespaceName = process.env.CODESPACE_NAME

export const getCodespaceApiUrl = (): string | null => {
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : null
}

export const getHost = (): string => {
  return codespaceName ? '0.0.0.0' : 'localhost'
}

export const getAllowedOrigins = (): string[] => {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ]

  if (codespaceName) {
    allowedOrigins.push(`https://${codespaceName}-5173.app.github.dev`)
    allowedOrigins.push(`https://${codespaceName}-8000.app.github.dev`)
  }

  return allowedOrigins
}

export const app = express()

app.use(express.json())

app.use((req, res, next) => {
  const allowedOrigins = getAllowedOrigins()
  const origin = req.headers.origin as string | undefined

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  }

  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker backend is running')
})

export async function start() {
  await connectDb()

  const codespaceApiUrl = getCodespaceApiUrl()
  if (codespaceApiUrl) {
    console.log(`Codespaces detected. API external URL: ${codespaceApiUrl}`)
  }

  const host = getHost()
  app.listen(PORT, host, () => console.log(`Server listening on ${host}:${PORT}`))
}
