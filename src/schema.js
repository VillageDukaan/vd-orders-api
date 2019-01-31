export const typeDefs = `
  type Query {
    echo(msg: String!): String
    getOrders(limit: Int = 25): [Order]
  }

  type Order {
    id: Int
    status: String,
    paymentId: String
  }
`;
