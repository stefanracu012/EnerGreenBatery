import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'energreenbatery@gmail.com'
  const password = 'energreen26'

  const hash = await bcrypt.hash(password, 12)

  const existing = await prisma.adminUser.findUnique({ where: { email } })

  if (existing) {
    await prisma.adminUser.update({
      where: { email },
      data: { password: hash }
    })
    console.log(`✅ Admin user updated: ${email}`)
  } else {
    await prisma.adminUser.create({
      data: { email, password: hash }
    })
    console.log(`✅ Admin user created: ${email}`)
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
