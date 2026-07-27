import bcrypt from 'bcrypt';
import { prisma } from '../src/lib/prisma';

async function main() {
  const hashedPassword = await bcrypt.hash('Admin@1234', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@rentnest.com' },
    update: {},
    create: {
      name: 'RentNest Super Admin',
      email: 'admin@rentnest.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin Seeded Successfully:', admin.email);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());