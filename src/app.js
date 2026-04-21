import express from 'express'
import cors from 'cors'
import prisma from './config/db.js';
const app = express()
const PORT = process.env.PORT || 3000
import menuRoutes from './routes/menuRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';

app.use(cors())
app.use(express.json())


app.use('/api/menu', menuRoutes)
app.use('/api/restaurants', restaurantRoutes)

app.get('/', (req, res) => {
  res.send('Restaurant API is running')
})







// app.get('/api/restaurants', async (req, res) => {
//   try {
//     const restaurants = await prisma.restaurant.findMany()
//     res.json(restaurants)
//   } catch (error) {
//     console.error("Prisma Error:", error);
//     res.status(500).json({ error: 'Failed to fetch restaurants', details: error.message });
//   }
// })



// app.get('/api/restaurants/:restaurantId/menu', async (req, res) => {
//   const { restaurantId } = req.params
//   try {
//     const menu = await prisma.menuItem.findMany({
//       where: { restaurantId: restaurantId }
//     })
//     res.json(menu)
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching menu for this restaurant' })
//   }
// })

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})


