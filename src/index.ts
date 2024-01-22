import express from 'express';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import noteRoutes from './routes/note'
import productRoutes from './routes/product'
import 'dotenv/config'
import cron from 'node-cron'
import controllers from './controllers/product'

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('connected to mongoose')
})
.catch((error) => {
  console.log(`failed to connect to mongoose: ${error}`)
})

cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Cron job is running');
    await controllers.getProductsPeriodically();
  } catch (error) {
    console.error('Cron job error:', error);
  }
});

export const app = express()

app.use(cors())
app.use(compression())
app.use(express.json())

app.use('/api/v1/notes', noteRoutes)
app.use('/api/v1/products', productRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

