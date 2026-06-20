import express from 'express'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'
import { connectDb, MONGODB_URI } from './config/database'

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
    allowedOrigins.push(`https://${codespace}-5173.app.github.dev`)
    allowedOrigins.push(`https://${codespace}-8000.app.github.dev`)
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

    // If running in Codespaces, expose the preferred external API URL
    const codespace = process.env.CODESPACE_NAME
    if (codespace) {
      const apiUrl = `https://${codespace}-8000.app.github.dev`
      console.log(`Codespaces detected. API external URL: ${apiUrl}`)
    }

    // Bind to 0.0.0.0 in Codespaces, otherwise localhost
    const host = codespace ? '0.0.0.0' : 'localhost'
    app.listen(PORT, host, () => console.log(`Server listening on ${host}:${PORT}`))
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()
