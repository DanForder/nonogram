import { v4 as uuidv4 } from "uuid";

const getUniqueId = (prefix = "", suffix = ""): string => {
  const uniqueId = uuidv4();

  return `${prefix}${uniqueId}${suffix}`;
};

export default getUniqueId;
