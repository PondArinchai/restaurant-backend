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

export const getrestaurantId = async (req,res) => {
    try{
      const { id } = req.params
      const restaurant = await prisma.restaurant.findUnique({
        where: { id }
      })
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.json(restaurant);
    }
    catch(error){
      res.status(500).json({
        error: 'Failed to fetch restaurant',
        details: error.message
      })
    }
}

export const getrestaurantMenu = async (req,res) => {
    try{
      const {id} = req.params
      const menu = await prisma.menuItem.findMany({
        where: { restaurantId : id }
      })
      res.json(menu);
    }
    catch(error){
      res.status(500).json({
        error: 'Failed to fetch menu',
        details: error.message
      })
    }
}

export const updateRestaurant = async (req,res) => {
    try{
      const { id } = req.params
      const { name, description, logoUrl } = req.body
      const updatedRestaurant = await prisma.restaurant.update({
        where: { id },
        data: { name, description, logoUrl }
      })
      res.json(updatedRestaurant);
    }
    catch(error){
      res.status(500).json({
        error: 'Failed to update restaurant', 
        details: error.message
      })
    } 
}

export const deleteRestaurant = async (req,res) => {
    try{
      const { id } = req.params 
      await prisma.restaurant.delete({
        where: { id }
      })
      res.json({ message: 'Restaurant deleted successfully' });
    }
    catch(error){
      res.status(500).json({
        error: 'Failed to delete restaurant',
        details: error.message
      })
    } 
}