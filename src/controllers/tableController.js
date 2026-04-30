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

export const getTables = async (req,res) => {
    try{
        const tables = await prisma.table.findMany()
        res.json(tables)
    }
    catch(error){
        res.status(500).json({
            error: 'Failed to fetch tables',
            details: error.message
        })
    }
}

export const getTablerestaurant = async(req,res) => {
    try{
        const {restaurantId} = req.params
        const tables = await prisma.table.findMany({
            where:{restaurantId}
        })
        res.json(tables)
    }
    catch(error){
        res.status(500).json({
            error: 'Failed to fetch tables for this restaurant',
            details: error.message
        })
    }
}

export const getTableId = async(req,res) => {
    try{
        const {id} = req.params
        const table = await prisma.table.findUnique({
            where:{ id }
        })
        if(!table){
            return res.status(404).json({ error: 'Table not found' })
        }
        res.json(table)
    }
    catch(error){
        res.status(500).json({
            error: 'Failed to fetch table',
            details: error.message
        })

    }
}

export const deleteTable = async(req,res) => {
    try{
        const {id} = req.params
        const table = await prisma.table.findUnique({
            where:{ id }
        })
        if(!table){
            return res.status(404).json({ error: 'Table not found' })
        }
        await prisma.table.delete({
            where:{ id }
        })
        res.json({ message: 'Table deleted successfully' })
    } catch(error){
        res.status(500).json({
            error: 'Failed to delete table',
            details: error.message
        })
    } 
     
}

export const updateTablestatus = async(req,res) => {
    try{
        const {id} = req.params
        const { status } = req.body

        if(!['AVAILABLE', 'OCCUPIED'].includes(status)){
            return res.status(400).json({ error: 'Invalid status value' })
        }

        const table = await prisma.table.findUnique({
            where:{ id }
        })

        if(!table){
            return res.status(404).json({ error: 'Table not found' })
        }

        const updatedTable = await prisma.table.update({
            where:{ id },
            data:{ status }
        })
        res.json(updatedTable)
    }
    catch(error){
        res.status(500).json({
            error: 'Failed to update table status',
            details: error.message
        })
    }

}



