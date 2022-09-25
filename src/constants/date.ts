import { formatRelative } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { capitalize, lowerFirst } from "lodash";

export const formatDateInRelativeFormat = (date: Timestamp, useCapital: boolean = true) => {
  const operator = useCapital ? capitalize : lowerFirst;
  return operator(formatRelative(new Date(date.seconds * 1000), new Date()));
};
