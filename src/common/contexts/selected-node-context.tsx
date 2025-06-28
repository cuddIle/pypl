"use client";

import { DeviceNodeType } from "@/components/react-flow/device-node";
import { createContext, useContext, useState, type ReactNode } from "react";

interface SelectedNodeContextType {
  selectedNode: DeviceNodeType | undefined;
  setSelectedNode: (node: DeviceNodeType | undefined) => void;
}

const SelectedNodeContext = createContext<SelectedNodeContextType | undefined>(
  undefined,
);

export function SelectedNodeProvider({ children }: { children: ReactNode }) {
  const [selectedNode, setSelectedNode] = useState<
    DeviceNodeType | undefined
  >();

  return (
    <SelectedNodeContext.Provider value={{ selectedNode, setSelectedNode }}>
      {children}
    </SelectedNodeContext.Provider>
  );
}

export function useSelectedNode() {
  const ctx = useContext(SelectedNodeContext);
  if (!ctx)
    throw new Error(
      "useSelectedNode must be used within a SelectedNodeProvider",
    );
  return ctx;
}
