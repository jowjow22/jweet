import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function main() {  
  console.log('Creating a new user')
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })