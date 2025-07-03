"use client";

import { type Device } from "@/common/schemas/devices/device";
import { client } from "@/common/trpc/client";
import ConfigEditor from "@/components/config-editor";
import { Group, NativeSelect, Stack } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Page() {
  const [selectedDevice, setSelectedDevice] = useState<Device>();
  const [allDevicesIds, setAllDevicesIds] = useState<string[]>([]);
  const [allDevicesNames, setAllDevicesNames] = useState<string[]>([]);

  useEffect(() => {
    client.device.get.query({}).then((devices) => {
      setAllDevicesIds(devices.map((device) => device.id));
      setAllDevicesNames(devices.map((device) => device.name));
    });
  }, []);

  return (
    <Stack m="lg">
      <Group gap="xl">
        <NativeSelect
          label="Device Names"
          data={allDevicesNames}
          w="200px"
          value={selectedDevice ? selectedDevice.name : ""}
          onChange={(event) => {
            client.device.get
              .query({ name: [event.currentTarget.value] })
              .then((devices) => {
                if (devices.length > 0) {
                  setSelectedDevice(devices[0]);
                }
              });
          }}
        />
        <NativeSelect
          label="Device Id"
          data={allDevicesIds}
          w="200px"
          value={selectedDevice ? selectedDevice.id : ""}
          onChange={(event) => {
            client.device.get
              .query({ id: [event.currentTarget.value] })
              .then((devices) => {
                if (devices.length > 0) {
                  setSelectedDevice(devices[0]);
                }
              });
          }}
        />
      </Group>
      <ConfigEditor
        configId={selectedDevice ? selectedDevice.configId : "-1"}
      />
    </Stack>
  );
}
