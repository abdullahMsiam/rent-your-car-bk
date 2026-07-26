import { prisma } from '../../lib/prisma';

export const CategoryService = {
    async getAllCategories() {
        return await prisma.category.findMany();
    },

    async createCategory(payload: { name: string; slug: string }) {
        return await prisma.category.create({ data: payload });
    },
};