import prisma from '../config/db.js';

export const createMenuItem = async (req, res) => {
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
};