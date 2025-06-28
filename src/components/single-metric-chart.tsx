import { DisplaySingleMetric } from "@/common/schemas/highcharts/display-metric";
import { useMantineTheme } from "@mantine/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function SingleMetricChart({
  metrics,
}: {
  metrics: DisplaySingleMetric[];
}) {
  const theme = useMantineTheme();

  Highcharts.setOptions({
    chart: {
      backgroundColor: theme.colors.dark[5],
      style: { fontFamily: "sans-serif" },
      borderRadius: 8,
    },
    time: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    title: { style: { color: "#fff" } },
    xAxis: {
      labels: { style: { color: "#fff" } },
      lineColor: "#888",
      tickColor: "#888",
    },
    yAxis: {
      title: { style: { color: "#fff" } },
      labels: { style: { color: "#fff" } },
      gridLineColor: "#444",
    },
    legend: {
      itemStyle: { color: "#fff" },
      itemHoverStyle: { color: "#ddd" },
    },
  });

  const options: Highcharts.Options = {
    chart: {
      zooming: {
        type: "x",
      },
    },
    title: {
      text: "CPU Usage per Device",
    },
    xAxis: {
      type: "datetime",
    },
    legend: {
      enabled: true,
    },
    series: metrics.map((metric) => ({
      name: metric.name,
      data: metric.points.map((point) => [point.time, point.value]),
      type: "line",
    })),
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
