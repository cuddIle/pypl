import { SelectedHouseProvider } from "@/common/contexts/selected-house";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "antd/dist/reset.css";
import { ReactNode } from "react";

// For antd v5+

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SelectedHouseProvider>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript />
        </head>
        <body>
          <MantineProvider defaultColorScheme="dark">
            {children}
          </MantineProvider>
        </body>
      </html>
    </SelectedHouseProvider>
  );
}
