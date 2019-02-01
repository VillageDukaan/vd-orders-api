import * as Sentry from "@sentry/node";

export const getOrders = async (parent, args, context) => {
  try {
    const { database } = context;
    const { limit } = args;
    const orders = await database.query("SELECT * FROM orders LIMIT $1", [
      limit
    ]);
    return orders.rows.map(order => ({
      id: order.id,
      status: order.status,
      paymentId: order.payment_id
    }));
  } catch (error) {
    const { rollbar, airBrake } = context;
    Sentry.captureException(error);
    rollbar.error(error);
    airBrake.notify(error);
  }
};
