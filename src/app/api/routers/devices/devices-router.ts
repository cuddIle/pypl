import {
  type Device,
  deviceFilterSchema,
  deviceSchema,
  DeviceType,
} from "@/common/schemas/devices/device";
import { createTRPCRouter, publicProcedure } from "@/common/trpc/init";
import { z } from "zod";

const deviceTypes = Object.values(DeviceType);

const devices: Device[] = Array.from({ length: 100 }, (_, i) => {
  const id = (i + 1).toString();
  return {
    id,
    type: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
    name: `Device ${id}`,
    configId: Number(id).toString(8),
    nodeId: Number(id + 1_005_532).toString(8),
    roomId: Number((i % 3) + 1 + 66_666).toString(8),
    roomName: `Room ${(i % 3) + 1}`,
    version: `1.0.${i % 3}`,
    houseId: Number((i % 4) + 1 + 214_214).toString(8),
    houseName: `House ${(i % 4) + 1}`,
  };
});

export const devicesRouter = createTRPCRouter({
  get: publicProcedure
    .input(deviceFilterSchema)
    .output(z.array(deviceSchema))
    .query(async opts => {
      const filter = opts.input;
      return devices.filter(device => {
        return (
          (!filter.id || filter.id.includes(device.id)) &&
          (!filter.type || filter.type.includes(device.type)) &&
          (!filter.name || filter.name.includes(device.name)) &&
          (!filter.configId || filter.configId.includes(device.configId)) &&
          (!filter.roomId || filter.roomId.includes(device.roomId)) &&
          (!filter.roomName || filter.roomName.includes(device.roomName)) &&
          (!filter.version || filter.version.includes(device.version)) &&
          (!filter.houseId || filter.houseId.includes(device.houseId)) &&
          (!filter.houseName || filter.houseName.includes(device.houseName))
        );
      });
    }),
});
