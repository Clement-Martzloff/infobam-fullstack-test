"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import React from "react";

export default function NuqsAdapterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
