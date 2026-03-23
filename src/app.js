import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const app = express()
const PORT = process.env.PORT || 3000

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})


app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Restaurant API is running')
})

app.post('/api/restaurants', async (req, res) => {
  try {
    const { name, description, logoUrl } = req.body

    const newRestaurant = await prisma.restaurant.create({
      data: { name, description, logoUrl }
    })

    res.status(201).json(newRestaurant)
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create restaurant',
      details: error.message
    })
  }
})



app.post('/api/MenuItem', async (req, res) => {
  try{
    const { restaurantId, name, price, description, imageUrl } = req.body

    const newMenuItem = await prisma.menuItem.create({
      data: { restaurantId, name, price, description, imageUrl }
    })
    res.status(201).json(newMenuItem)
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create menu item',
      details: error.message
    })
  }
})

app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany()
    res.json(restaurants)
  } catch (error) {
    console.error("Prisma Error:", error);
    res.status(500).json({ error: 'Failed to fetch restaurants', details: error.message });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})


app.get('/api/restaurants/:restaurantId/menu', async (req, res) => {
  const { restaurantId } = req.params
  try {
    const menu = await prisma.menuItem.findMany({
      where: { restaurantId: restaurantId }
    })
    res.json(menu)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching menu for this restaurant' })
  }
})