import { v4 } from "uuid";

const getUniqueId = (): string => {
  return v4();
};

export default getUniqueId;
