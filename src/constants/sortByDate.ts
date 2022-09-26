import { sortBy } from "lodash";
import { Entity } from "models/model";

export function sortEntitiesByDate<EntityType extends Entity>(entities: Array<EntityType>): Array<EntityType> {
  return sortBy(entities, (entity) => new Date(entity.addedOn.seconds * 1000));
};
