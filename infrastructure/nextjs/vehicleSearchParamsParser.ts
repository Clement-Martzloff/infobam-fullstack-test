import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  parseAsArrayOf,
} from "nuqs/server";

export const vehicleSearchParamsParser = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(5),
  manufacturer: parseAsArrayOf(parseAsString),
  type: parseAsArrayOf(parseAsString),
  year: parseAsArrayOf(parseAsInteger),
  sortBy: parseAsStringLiteral(["price", "year"] as const),
  sortOrder: parseAsStringLiteral(["asc", "desc"] as const),
};
