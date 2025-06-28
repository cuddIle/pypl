import { createTRPCRouter } from "@/common/trpc/init";
import { houseRouter } from "./house-router";
import { roomRouter } from "./room-router";


export const buildingRouter = createTRPCRouter({
  house: houseRouter,
  room: roomRouter,
});
