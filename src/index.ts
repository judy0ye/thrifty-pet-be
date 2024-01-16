import express from 'express';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import noteRoutes from './routes/note'
import 'dotenv/config'

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('connected to mongoose')
})
.catch((error) => {
  console.log(`failed to connect to mongoose: ${error}`)
})

const app = express()

app.use(cors())
app.use(compression())
app.use(express.json())

app.use('/api/v1/notes', noteRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
