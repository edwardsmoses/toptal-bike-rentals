import { mean, values } from "lodash";

export const calculateBikeRating = (ratings: Record<string, number>) => {
  return mean(values(ratings || {})) || 0;
};
