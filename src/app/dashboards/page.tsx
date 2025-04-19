"use client";

import { useEffect, useState } from "react";
import { deserializePoint } from "@/common/types";
import MetricsLineChart from "@/components/metricsLineChart";
import { Group, NativeSelect, Stack } from "@mantine/core";

// Fetch device IDs from the API
async function fetchDeviceIds(): Promise<string[]> {
  const response = await fetch("http://localhost:3000/api/device/ids", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

// Fetch points for a specific device ID
async function fetchPointsForDevice(deviceId: string): Promise<any[]> {
  const response = await fetch("http://localhost:3000/api/device/cpu", {
      method: "POST",
      body: JSON.stringify({ deviceIds: [deviceId] }),
      headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data.map(deserializePoint);
}

export default function Page() {
    const [deviceIds, setDeviceIds] = useState<string[]>([]);
    const [points, setPoints] = useState<any[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>("all");

    useEffect(() => {
        fetchDeviceIds().then((deviceIds) => setDeviceIds(deviceIds));
        fetchPointsForDevice(selectedDeviceId).then((points) => setPoints(points));
    }, [selectedDeviceId]);

    console.log("points", points);
    return (
        <>
        <Stack
        align="stretch"
        justify="center"
        gap="50px"
        style={ {marginTop: 20, height: "auto" }}>
          <NativeSelect
              label="Device Id"
              data={deviceIds.concat(['all'])}
              value={selectedDeviceId}
              onChange={(event) => setSelectedDeviceId(event.currentTarget.value)}
              style={{ marginLeft: 50 }}
              w="200px"
          />
          <Group grow>
            <MetricsLineChart points={points} />
            <MetricsLineChart points={points} />
          </Group>
          <Group grow>
            <MetricsLineChart points={points} />
          </Group>
        </Stack>
        </>
    );
}