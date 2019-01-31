import { echo } from "./echo";
import { getOrders } from "./orders";

export const Query = {
  echo: (parent, { msg }) => echo({ msg }),
  getOrders
};
