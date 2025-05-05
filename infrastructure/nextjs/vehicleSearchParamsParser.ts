import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const vehicleSearchParamsParser = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(6),
  manufacturer: parseAsArrayOf(parseAsString),
  type: parseAsArrayOf(parseAsString),
  year: parseAsArrayOf(parseAsInteger),
  sortBy: parseAsStringLiteral(["price", "year"] as const),
  sortOrder: parseAsStringLiteral(["asc", "desc"] as const),
};
