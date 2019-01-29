import { echo } from "./echo";

export const Query = {
  echo: (parent, { msg }) => echo({ msg })
};
