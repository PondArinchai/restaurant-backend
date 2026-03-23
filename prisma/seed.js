import 'dotenv/config'; // จำเป็นต้องโหลด .env เพื่อดึง DATABASE_URL
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});


const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('Start seeding the data');


  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Freedom',
      description: 'อาหารตามสั่ง',
      logoUrl: 'https://example.com/logo.png',
    },
  });
  console.log(`create restaurant: ${restaurant.name}`);


  await prisma.menuItem.createMany({
    data: [
      { restaurantId: restaurant.id, name: 'ข้าวกะเพราหมูสับ', price: 60, description: 'เผ็ดกลาง', imageUrl: '' },
      { restaurantId: restaurant.id, name: 'ข้าวผัดกุ้ง', price: 70, description: '', imageUrl: '' },
      { restaurantId: restaurant.id, name: 'ต้มยำทะเลน้ำข้น', price: 150, description: 'เพิ่มเผ็ด', imageUrl: '' },
    ],
  });
  console.log(`create menu items: ${restaurant.name}`);


  await prisma.table.createMany({
    data: [
      { restaurantId: restaurant.id, tableNumber: 'T01', qrToken: 'token-t01' },
      { restaurantId: restaurant.id, tableNumber: 'T02', qrToken: 'token-t02' },
      { restaurantId: restaurant.id, tableNumber: 'T03', qrToken: 'token-t03' },
    ],
  });
  console.log(`create tables: ${restaurant.name}`);

  console.log('Seed data completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });