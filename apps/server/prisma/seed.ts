import { PrismaClient } from '../node_modules/.prisma/client'
const prisma = new PrismaClient()

// Define an async function to seed the database with the tag data
async function main() {
    console.log(`Start seeding ...`)
    const products = [
        {
            name: 'Product 1',
            description: 'Product 1 description',
            price: 100,
            image: 'https://picsum.photos/200/300',
            stock: 10,
        },
        {
            name: 'Product 2',
            description: 'Product 2 description',
            price: 200,
            image: 'https://picsum.photos/200/300',
            stock: 20,
        },
        {
            name: 'Product 3',
            description: 'Product 3 description',
            price: 300,
            image: 'https://picsum.photos/200/300',
            stock: 30,
        },
    ]

    for (const product of products) {
        await prisma.product.create({
            data: product,
        })
    }
    console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
    