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

export const getMenuItemsById = async (req,res) => {
  try{
    const {id} = req.params
    const item = await prisma.menuItem.findUnique({
      where: { id }
    })
    if(!item){
      return res.status(404).json({ error: 'Menu item not found' })
    }
    res.json(item)
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch menu item',
      details: error.message
    })
  }
}

export const updateMenuItem = async (req,res) => {
  try{
    const { id } = req.params
    const { name, price, description, imageUrl } = req.body
    const updatedMenuItem = await prisma.menuItem.update({
      where: { id },
      data: { name, price, description, imageUrl }
    })
    res.json(updatedMenuItem)
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update menu item',
      details: error.message
    })
  }
}

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params
    const item = await prisma.menuItem.findUnique({ where: { id } })
    if (!item) return res.status(404).json({ error: 'Menu item not found' })
 
    await prisma.menuItem.delete({ where: { id } })
    res.json({ message: 'Menu item deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu item', details: error.message })
  }
}