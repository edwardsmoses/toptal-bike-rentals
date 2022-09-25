import { formatRelative } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { capitalize } from "lodash";

export const formatDateInRelativeFormat = (date: Timestamp) => {
  return capitalize(formatRelative(new Date(date.seconds * 1000), new Date()));
};