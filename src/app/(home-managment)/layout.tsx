"use client";

import { SelectedHouseProvider } from "@/common/contexts/selected-house";
import { ReactNode } from "react";

export default function HomeManagmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SelectedHouseProvider>{children}</SelectedHouseProvider>;
}
