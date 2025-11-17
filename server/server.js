import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'

const app = express()

await connectCloudinary()

// ✅ CORS MUST BE FIRST
app.use(cors({
  origin: ["https://quick-ai-powered.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json())
app.use(clerkMiddleware())

// Protect ONLY API routes
app.use('/api/ai', requireAuth(), aiRouter)
app.use('/api/user', requireAuth(), userRouter)

// Root route
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
