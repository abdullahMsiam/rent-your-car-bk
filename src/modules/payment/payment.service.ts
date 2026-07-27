import { stripe } from '../../lib/stripe';
import { prisma } from '../../lib/prisma';
import config from '../../config';

export const PaymentService = {
  async createStripeCheckout(rentalRequestId: string, userId: string) {
    const rental = await prisma.rentalRequest.findUnique({
      where: { id: rentalRequestId },
      include: { property: true },
    });

    if (!rental || rental.status !== 'APPROVED') {
      throw new Error('Rental request not found or not approved');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: rental.property.title },
            unit_amount: Math.round(rental.totalAmount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${config.client_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.client_url}/payment/cancel`,
      metadata: { rentalRequestId, tenantId: userId },
    });

    await prisma.payment.create({
      data: {
        tenantId: userId,
        rentalRequestId,
        amount: rental.totalAmount,
        transactionId: session.id,
        provider: 'STRIPE',
        status: 'PENDING',
      },
    });

    return { paymentUrl: session.url };
  },

  async confirmStripePayment(sessionId: string) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const payment = await prisma.payment.update({
        where: { transactionId: sessionId },
        data: { status: 'COMPLETED', paidAt: new Date() },
      });

      await prisma.rentalRequest.update({
        where: { id: payment.rentalRequestId },
        data: { status: 'COMPLETED' },
      });

      return payment;
    }
    throw new Error('Payment transaction verification failed');
  },
};