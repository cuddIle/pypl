import {Point, serializePoint } from "@/common/types";
import { cpuPoints } from "../../(data)/points";

export async function GET(request: Request) {
    const deviceIds = Array.from(new Set(cpuPoints.flatMap((point) => point.labels.deviceId)));
    return Response.json(deviceIds, {});
}
