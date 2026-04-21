import prisma from '../config/db.js';



export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany()
    res.json(restaurants)
  } catch (error) {
    console.error("Prisma Error:", error);
    res.status(500).json({ error: 'Failed to fetch restaurants', details: error.message });
  }
};



export const createRestaurant = async (req, res) => {
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
};