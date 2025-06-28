"use client";

import { useSelectedHouse } from "@/common/contexts/selected-house";
import { type House } from "@/common/schemas/buildings/house";
import { client } from "@/common/trpc/client";
import AppNavbar from "@/components/app-nav-bar";
import { AppShell, Group, NativeSelect, Text } from "@mantine/core";
import { ConfigProvider, theme } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { FaHome, FaSitemap } from "react-icons/fa";
import { GrDocumentConfig } from "react-icons/gr";
import { LiaPepperHotSolid } from "react-icons/lia";
import { MdAutoGraph } from "react-icons/md";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { selectedHouse, selectHouse } = useSelectedHouse();
  const [allHouses, setAllHouses] = useState<House[]>([]);

  const pages = [
    { label: "Overview", icon: FaHome, link: "/overview" },
    { label: "Statistics", icon: MdAutoGraph, link: "/statistics" },
    {
      label: "Configuration",
      icon: GrDocumentConfig,
      link: "/configuration/-1",
    },
    { label: "Connections", icon: FaSitemap, link: "/connections" },
  ];

  useEffect(() => {
    client.building.house.get.query({}).then((houses) => setAllHouses(houses));
  }, []);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group
            justify="space-between"
            ml="xl"
            mr="xl"
            align="center"
            style={{ height: "100%" }}
          >
            <Group>
              <LiaPepperHotSolid size={45} />
              <Text size="25px" fw={700}>
                Pypl
              </Text>
            </Group>
            <NativeSelect
              data={[
                { label: "Select house", value: "" },
                ...allHouses.map((house) => ({
                  label: house.name,
                  value: house.id,
                })),
              ]}
              value={selectedHouse || ""}
              onChange={(event) => {
                selectHouse(event.currentTarget.value);
              }}
              style={{ width: "200px" }}
            />
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <AppNavbar pages={pages} />
        </AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </ConfigProvider>
  );
}
