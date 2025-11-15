import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

// Protect API routes
app.use(requireAuth())

// API routes
app.use('/api/ai', aiRouter)

// Root route LAST
app.get('/', (req, res) => {
  res.send('server is live')
})

// Error handler 
app.use((error, req, res, next) => {
  res.status(400).json({
    success: false,
    message: error.message || "Invalid JSON",
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("server is running on port", PORT)
})
