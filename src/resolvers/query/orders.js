export const getOrders = async (parent, args, context) => {
  try {
    const { database } = context;
    const { limit } = args;
    const orders = await database.query(
      "SELECT * FROM orders ORDER BY created_at desc LIMIT $1",
      [limit]
    );
    return orders.rows.map(order => ({
      id: order.id,
      status: order.status,
      paymentId: order.payment_id,
      deliveryAddress: order.delivery_address,
      billingAddress: order.billing_address,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }));
  } catch (error) {
    const { logger } = context;
    logger.error(error);
  }
};
