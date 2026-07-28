import { prisma } from '../../lib/prisma.js';

export const ReviewService = {
    async createReview(tenantId: string, payload: { propertyId: string; rating: number; comment: string }) {
        return await prisma.review.create({
            data: { ...payload, tenantId },
        });
    },
};