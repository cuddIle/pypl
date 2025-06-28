import { roomFilterSchema, roomSchema } from "@/common/schemas/buildings/room";
import { createTRPCRouter, publicProcedure } from "@/common/trpc/init";
import z from "zod";

const rooms = [
  {
    id: Number((0 % 3) + 1 + 66_666).toString(8),
    name: "Room 1",
    houseId: Number((0 % 4) + 1 + 214_214).toString(8),
  },
  {
    id: Number((1 % 3) + 1 + 66_666).toString(8),
    name: "Room 2",
    houseId: Number((0 % 4) + 1 + 214_214).toString(8),
  },
  {
    id: Number((2 % 3) + 1 + 66_666).toString(8),
    name: "Room 3",
    houseId: Number((0 % 4) + 1 + 214_214).toString(8),
  },
  {
    id: Number((3 % 3) + 1 + 66_666).toString(8),
    name: "Room 4",
    houseId: Number((1 % 4) + 1 + 214_214).toString(8),
  },
  {
    id: Number((4 % 3) + 1 + 66_666).toString(8),
    name: "Room 5",
    houseId: Number((1 % 4) + 1 + 214_214).toString(8),
  },
  {
    id: Number((5 % 3) + 1 + 66_666).toString(8),
    name: "Room 6",
    houseId: Number((1 % 4) + 1 + 214_214).toString(8),
  },
  {
    id: Number((6 % 3) + 1 + 66_666).toString(8),
    name: "Room 7",
    houseId: Number((2 % 4) + 1 + 214_214).toString(8),
  },
  {
    id: Number((7 % 3) + 1 + 66_666).toString(8),
    name: "Room 8",
    houseId: Number((2 % 4) + 1 + 214_214).toString(8),
  },
  {
    id: Number((8 % 3) + 1 + 66_666).toString(8),
    name: "Room 9",
    houseId: Number((2 % 4) + 1 + 214_214).toString(8),
  },
  {
    id: Number((9 % 3) + 1 + 66_666).toString(8),
    name: "Room 10",
    houseId: Number((3 % 4) + 1 + 214_214).toString(8),
  },
  {
    id: Number((10 % 3) + 1 + 66_666).toString(8),
    name: "Room 11",
    houseId: Number((3 % 4) + 1 + 214_214).toString(8),
  },
  {
    id: Number((11 % 3) + 1 + 66_666).toString(8),
    name: "Room 12",
    houseId: Number((3 % 4) + 1 + 214_214).toString(8),
  },
];

export const roomRouter = createTRPCRouter({
  get: publicProcedure
    .input(roomFilterSchema)
    .output(z.array(roomSchema))
    .query(async opts => {
      const filter = opts.input;
      return rooms.filter(room => {
        return (
          (!filter.id || filter.id.includes(room.id)) &&
          (!filter.name || filter.name.includes(room.name)) &&
          (!filter.houseId || filter.houseId.includes(room.houseId))
        );
      });
    }),
});
