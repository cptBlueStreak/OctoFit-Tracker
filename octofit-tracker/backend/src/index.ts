import express from 'express'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'
import { connectDb, MONGODB_URI } from './database'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

// Basic JSON parsing
app.use(express.json())

// Simple CORS middleware that allows frontend (5173) and Codespaces preview domain
app.use((req, res, next) => {
  const codespace = process.env.CODESPACE_NAME
  const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ]
  if (codespace) {
    // GitHub Codespaces preview URL pattern (best-effort)
    allowedOrigins.push(`https://${codespace}-5173.githubpreview.dev`)
    allowedOrigins.push(`https://${codespace}-8000.githubpreview.dev`)
  }
  const origin = req.headers.origin as string | undefined
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

// Mount API routes
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker backend is running')
})

async function start() {
  try {
    await connectDb()

    // If running in Codespaces, expose a likely external API URL for previews
    if (process.env.CODESPACE_NAME) {
      const name = process.env.CODESPACE_NAME
      const apiUrl = `https://${name}-8000.githubpreview.dev`
      console.log(`Codespaces detected. API external URL (preview): ${apiUrl}`)
    }

    // Bind to 0.0.0.0 so Codespaces port forwarding can reach the server
    const host = process.env.CODESPACE_NAME ? '0.0.0.0' : 'localhost'
    app.listen(PORT, host, () => console.log(`Server listening on ${host}:${PORT}`))
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()
