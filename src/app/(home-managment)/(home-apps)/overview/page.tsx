"use client";

import { type Device } from "@/common/schemas/devices/device";
import { client } from "@/common/trpc/client";
import DeviceIcon from "@/components/device-icon";
import { Box, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Page() {
  const [devices, setDevices] = useState<Device[]>([]);
  const theme = useMantineTheme();

  const cols = Math.ceil(Math.sqrt(devices.length));

  useEffect(() => {
    client.device.get.query({}).then((devices) => {
      setDevices(devices);
    });
  }, []);

  return (
    <SimpleGrid
      bg={theme.colors.dark[6]}
      h="80vh"
      p="md"
      cols={cols}
      spacing="xs"
      verticalSpacing="xs"
    >
      {devices.map((device) => (
        <Box
          key={device.id}
          p="sm"
          bg="green"
          style={{
            borderRadius: "8px",
            transition: "filter 0.1s, transform 0.1s",
            cursor: "pointer",
            aspectRatio: "1 / 1",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "brightness(1.2)";
            (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "";
            (e.currentTarget as HTMLElement).style.transform = "";
          }}
        >
          <DeviceIcon device={device} />
          <Text>{device.name}</Text>
          <Text size="xs" c="black">
            {device.id}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}
