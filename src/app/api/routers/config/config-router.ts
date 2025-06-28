import { type Config, configFilterSchema, configSchema } from "@/common/schemas/configs/config";
import { createTRPCRouter, publicProcedure } from "@/common/trpc/init";
import { z } from "zod";

const configs: Config[] = Array.from({ length: 100 }, (_, i) => {
  const locations = ["warehouse", "office", "factory", "lab"];
  const unitsList = ["C", "F", "K"];
  const tagsList = [
    ["env", "temp"],
    ["critical", "indoor"],
    ["outdoor", "humidity"],
    ["pressure", "monitor"],
    ["safety", "alert"],
  ];
  const firmwareVersions = ["1.0.2", "1.1.0", "2.0.0", "1.0.5"];
  const macBase = [0x00, 0x1A, 0x2B, 0x3C, 0x4D];

  return {
    id: (i + 1).toString(8),
    data: JSON.stringify(
      {
        interval: 10 + i * 2,
        enabled: i % 2 === 0,
        location: locations[i % locations.length],
        units: unitsList[i % unitsList.length],
        firmware: firmwareVersions[i % firmwareVersions.length],
        thresholds: { min: i, max: 30 + i },
        tags: tagsList[i % tagsList.length],
        calibration: { offset: (i % 10) / 10, scale: 1 + (i % 5) / 100 },
        lastMaintenance: new Date(2023, 0, 1 + (i % 365)).toISOString(),
        batteryLevel: 100 - (i % 91),
        ip: `192.168.${i % 256}.${(i * 3) % 256}`,
        mac: [...macBase, i % 256]
          .map(b => b.toString(16).padStart(2, "0"))
          .join(":"),
        alerts: [{ type: "temp", level: ["low", "medium", "high"][i % 3], active: i % 4 === 0 }],
      },
      undefined,
      2
    ),
  };
});

export const configRouter = createTRPCRouter({
  get: publicProcedure
    .input(configFilterSchema)
    .output(z.array(configSchema))
    .query(async opts => {
      const filter = opts.input;
      return configs.filter(config => {
        return !filter.id || filter.id.includes(config.id);
      });
    }),
});
