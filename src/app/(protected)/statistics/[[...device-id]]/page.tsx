"use client";

import { useSelectedHouse } from "@/common/contexts/selected-house";
import { DisplaySingleMetric } from "@/common/schemas/highcharts/display-metric";
import { client } from "@/common/trpc/client";
import SingleMetricChart from "@/components/single-metric-chart";
import { Box, Group, NativeSelect, Text, useMantineTheme } from "@mantine/core";
import { DatePicker } from "antd";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const theme = useMantineTheme();

  const { deviceIds } = useSelectedHouse();
  const [cpuMetrics, setCpuMetrics] = useState<DisplaySingleMetric[]>([]);
  const [selectedDeviceId, setselectedDeviceId] = useState<
    string | undefined
  >();
  const [timeFilter, setTimeFilter] = useState<{
    startTime: Date | undefined;
    endTime: Date | undefined;
  }>({
    startTime: undefined,
    endTime: undefined,
  });

  const queryMetrics = useCallback(() => {
    if (!selectedDeviceId) return;

    client.metrics.cpu.getCpuPerDevice
      .query({
        deviceId: [selectedDeviceId],
        ...(timeFilter.startTime && {
          startTime: timeFilter.startTime.getTime(),
        }),
        ...(timeFilter?.endTime && { endTime: timeFilter.endTime.getTime() }),
      })
      .then(setCpuMetrics);
  }, [selectedDeviceId, timeFilter]);

  useEffect(() => {
    queryMetrics();
  }, [queryMetrics]);

  return (
    <>
      ;
      <Group mb="xl">
        <NativeSelect
          label="Device IDs"
          data={[
            { label: "Select device", value: "" },
            ...deviceIds.map((id) => ({ label: id, value: id })),
          ]}
          value={selectedDeviceId || ""}
          onChange={(event) => setselectedDeviceId(event.currentTarget.value)}
          w="200px"
        />
        <Box>
          <Text size="14px" fw={700} mb="xs">
            Query Time Range
          </Text>
          <DatePicker.RangePicker
            showTime
            allowClear={true}
            allowEmpty={[true, true]}
            style={{
              background: theme.colors.dark[6],
              marginTop: "auto",
              height: "35px",
            }}
            panelRender={(panel) => (
              <div style={{ background: theme.colors.dark[6] }}>{panel}</div>
            )}
            onChange={(dates, _) => {
              setTimeFilter({
                startTime: dates?.[0]?.toDate() || undefined,
                endTime: dates?.[1]?.toDate() || undefined,
              });
            }}
          />
        </Box>
      </Group>
      <Group align="flex-start" gap="md" grow>
        <Box style={{ minWidth: 0 }}>
          <SingleMetricChart metrics={cpuMetrics} />
        </Box>
        <Box style={{ minWidth: 0 }}>
          <SingleMetricChart metrics={cpuMetrics} />
        </Box>
      </Group>
    </>
  );
}
