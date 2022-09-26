import { mean, round, values } from "lodash";

export const calculateBikeRating = (ratings: Record<string, number>) => {
  return round(mean(values(ratings || {})) || 0, 2);
};
