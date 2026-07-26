import { prisma } from '../../lib/prisma';

export const PropertyService = {
    async getAllProperties(filters: any) {
        const { city, minPrice, maxPrice, categoryId } = filters;
        const where: any = { isAvailable: true };

        if (city) where.city = { contains: city, mode: 'insensitive' };
        if (categoryId) where.categoryId = categoryId;
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = Number(minPrice);
            if (maxPrice) where.price.lte = Number(maxPrice);
        }

        return await prisma.property.findMany({
            where,
            include: { category: true, landlord: { select: { name: true, email: true } } },
        });
    },

    async getPropertyById(id: string) {
        return await prisma.property.findUnique({
            where: { id },
            include: { category: true, landlord: { select: { name: true, email: true, phoneNumber: true } }, reviews: true },
        });
    },

    async createProperty(landlordId: string, payload: any) {
        return await prisma.property.create({
            data: { ...payload, landlordId },
        });
    },

    async updateProperty(id: string, landlordId: string, payload: any) {
        return await prisma.property.updateMany({
            where: { id, landlordId },
            data: payload,
        });
    },

    async deleteProperty(id: string, landlordId: string) {
        return await prisma.property.deleteMany({
            where: { id, landlordId },
        });
    },
};