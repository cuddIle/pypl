"use client";

import { useSelectedNode } from "@/common/contexts/selected-node-context";
import {
  Box,
  Card,
  Group,
  Modal,
  RingProgress,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { GrDocumentConfig } from "react-icons/gr";
import { MdAutoGraph, MdOutlineClose } from "react-icons/md";
import ConfigEditor from "./config-editor";
import DeviceIcon from "./device-icon";

export default function NodeSidebar() {
  const { selectedNode, setSelectedNode } = useSelectedNode();
  const theme = useMantineTheme();
  const router = useRouter();
  const [
    deviceConfigurationOpened,
    { open: openDeviceConfiguration, close: closeDeviceConfiguration },
  ] = useDisclosure(false);

  if (!selectedNode) return;

  const device = selectedNode.data.device;

  return (
    <>
      <Modal
        opened={deviceConfigurationOpened}
        onClose={closeDeviceConfiguration}
        size="70%"
        title={device ? `${device.name}'s configuration` : ""}
        centered
        zIndex={1100}
      >
        <ConfigEditor configId={device ? device.configId : "-1"} />
      </Modal>

      <Box
        p="xs"
        style={{
          position: "absolute",
          top: 0,
          right: device ? 0 : -400, // Slide in/out
          height: "100%",
          minWidth: 300,
          maxWidth: "20%",
          overflow: "hidden",
          background: theme.colors.dark[6],
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: 8,
          zIndex: 1,
          transition: "right 0.3s",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack>
          <Group justify="space-between" align="center" mb="xs">
            <MdOutlineClose
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedNode(undefined)}
            ></MdOutlineClose>
            <Group>
              <FaHome />
              <MdAutoGraph
                style={{ cursor: "pointer" }}
                onClick={() =>
                  router.push(`/statistics/${device ? device.id : "-1"}`)
                }
              />
              <GrDocumentConfig
                style={{ cursor: "pointer" }}
                onClick={() => openDeviceConfiguration()}
              />
            </Group>
          </Group>

          <Card bg={theme.colors.dark[5]} style={{ borderRadius: "30px" }}>
            <Group>
              <DeviceIcon device={device} size={30} />
              <Box>
                <Text fz="xs">{device ? device.name : ""}</Text>
                <Text fz="xs" c="dimmed">
                  {device ? device.id : ""}
                </Text>
              </Box>
            </Group>
          </Card>

          <Card bg={theme.colors.dark[5]} style={{ borderRadius: "10px" }}>
            <Group justify="center">
              <Text fz="xs" tt="uppercase" fw={700} c="dimmed" mb="sm">
                Resure usage
              </Text>
            </Group>

            <Group justify="center">
              <Box>
                <RingProgress
                  size={90}
                  sections={[{ value: 40, color: "blue" }]}
                  label={
                    <Text c="blue" ta="center" size="sm">
                      40%
                    </Text>
                  }
                />
                <Text ta="center" size="9px">
                  CPU
                </Text>
              </Box>
              <Box>
                <RingProgress
                  size={90}
                  sections={[{ value: 65, color: "blue" }]}
                  label={
                    <Text c="blue" ta="center" size="sm">
                      65%
                    </Text>
                  }
                />
                <Text ta="center" size="9px">
                  Memory
                </Text>
              </Box>
            </Group>
          </Card>
        </Stack>
      </Box>
    </>
  );
}
