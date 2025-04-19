import {Point, serializePoint } from "@/common/types";
import moment from 'moment';
import { cpuPoints } from "../../(data)/points";

export async function POST(request: Request) {
    const body: any = await request.json()
    const deviceIds: any = body.deviceIds;

    console.log("SeldeviceIds", deviceIds)
    console.log("first", Array.isArray(deviceIds))
    console.log("second", deviceIds.length === 1)

    if (Array.isArray(deviceIds) && deviceIds.length === 1 && deviceIds[0] === 'all') {
        console.log("All deviceIds")
        return Response.json(cpuPoints.map(serializePoint), {})
    }

    const filteredPoints = cpuPoints.filter((point) => {
        return deviceIds.includes(point.labels.deviceId) ;
    })

    return Response.json(filteredPoints.map(serializePoint), {})
}
