import { prisma } from '../../lib/prisma.js';

export const UserService = {
  async getAllUsers() {
    return await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
    });
  },

  async updateUserStatus(id: string, status: 'ACTIVE' | 'BLOCKED') {
    return await prisma.user.update({
      where: { id },
      data: { status },
    });
  },
};