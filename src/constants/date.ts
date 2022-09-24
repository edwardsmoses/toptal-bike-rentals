import { formatRelative } from "date-fns";
import { Timestamp } from "firebase/firestore";

export const formatDateInRelativeFormat = (date: Timestamp) => {
  return formatRelative(new Date(date.seconds * 1000), new Date());
};
