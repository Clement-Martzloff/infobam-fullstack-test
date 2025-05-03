import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Check if the request is for the root path and if sortOrder or sortBy are missing
  if (
    url.pathname === "/" &&
    (!url.searchParams.has("sortOrder") || !url.searchParams.has("sortBy"))
  ) {
    const defaultSearchParams = new URLSearchParams({
      sortOrder: "desc",
      sortBy: "year",
    }).toString();

    // Create a new URL with the default search parameters
    const newUrl = new URL(
      `${url.origin}${url.pathname}?${defaultSearchParams}`,
    );

    // Redirect to the new URL
    return NextResponse.redirect(newUrl);
  }

  // Allow the request to proceed for other paths or if parameters are present
  return NextResponse.next();
}

// Optional: Configure matcher if needed, but for root path only, no matcher is required by default.
// export const config = {
//   matcher: '/',
// };
