import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const vehicleSearchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(5),
  manufacturer: parseAsString,
  type: parseAsString,
  year: parseAsInteger,
  sortBy: parseAsStringLiteral(["price", "year"] as const),
  sortOrder: parseAsStringLiteral(["asc", "desc"] as const),
};
