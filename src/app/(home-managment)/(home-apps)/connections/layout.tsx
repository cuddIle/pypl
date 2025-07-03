import { SelectedNodeProvider } from "@/common/contexts/selected-node-context";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <SelectedNodeProvider>{children}</SelectedNodeProvider>;
}
