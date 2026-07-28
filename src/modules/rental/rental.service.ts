import { prisma } from '../../lib/prisma.js';

export const RentalService = {
    async submitRequest(tenantId: string, payload: any) {
        const property = await prisma.property.findUnique({ where: { id: payload.propertyId } });
        if (!property || !property.isAvailable) {
            throw new Error('Property unavailable for rent');
        }

        const totalAmount = property.price * payload.duration;

        return await prisma.rentalRequest.create({
            data: { ...payload, tenantId, totalAmount, moveInDate: new Date(payload.moveInDate) },
        });
    },

    async getUserRequests(userId: string, role: string) {
        if (role === 'LANDLORD') {
            return await prisma.rentalRequest.findMany({
                where: { property: { landlordId: userId } },
                include: { tenant: { select: { name: true, email: true } }, property: true },
            });
        }
        return await prisma.rentalRequest.findMany({
            where: { tenantId: userId },
            include: { property: true },
        });
    },

    async updateRequestStatus(id: string, landlordId: string, status: 'APPROVED' | 'REJECTED') {
        const request = await prisma.rentalRequest.findFirst({
            where: { id, property: { landlordId } },
        });

        if (!request) throw new Error('Request not found or unauthorized');

        return await prisma.rentalRequest.update({
            where: { id },
            data: { status },
        });
    },
};