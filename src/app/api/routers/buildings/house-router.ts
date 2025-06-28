import { houseFilterSchema, houseSchema } from "@/common/schemas/buildings/house";
import { createTRPCRouter, publicProcedure } from "@/common/trpc/init";
import z from "zod";

const houses = [
  { id: Number((0 % 4) + 1 + 214_214).toString(8), name: "house1", address: "house1" },
  { id: Number((1 % 4) + 1 + 214_214).toString(8), name: "house2", address: "house2" },
  { id: Number((2 % 4) + 1 + 214_214).toString(8), name: "house3", address: "house3" },
  { id: Number((3 % 4) + 1 + 214_214).toString(8), name: "house4", address: "house4" },
];

export const houseRouter = createTRPCRouter({
  get: publicProcedure
    .input(houseFilterSchema)
    .output(z.array(houseSchema))
    .query(async opts => {
      const filter = opts.input;
      return houses.filter(house => {
        return (
          (!filter.id || filter.id.includes(house.id)) &&
          (!filter.name || filter.name.includes(house.name)) &&
          (!filter.address || filter.address.includes(house.address))
        );
      });
    }),
});
