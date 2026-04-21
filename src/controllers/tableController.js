import prisma from "../config/db.js";

export const createTable = async (req,res) =>{
    try{
        const { restaurantId, tableNumber,} = req.body

        const newTable = await prisma.table.create({
            data: { restaurantId, tableNumber }
        })
        res.status(200).json(newTable)
    }catch(error){
        res.status(500).json({
            error: 'Failed to create table',
            details: error.message
        })
    }
}