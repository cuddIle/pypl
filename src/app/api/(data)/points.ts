import { Point } from "@/common/types";
import moment from "moment";

export const cpuPoints: Point[] = [
    {
        date: moment().subtract(1, "days").toDate(),
        labels: {
            "deviceId": "1111",
        },
        value: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
    },
    {
        date: moment().subtract(2, "days").toDate(),
        labels: {
            "deviceId": "1111",
        },
        value: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
    },
    {
        date: moment().subtract(3, "days").toDate(),
        labels: {
            "deviceId": "1111",
        },
        value: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
    },
    {
        date: moment().subtract(4, "days").toDate(),
        labels: {
            "deviceId": "1111",
        },
        value: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
    },
    {
        date: moment().subtract(5, "days").toDate(),
        labels: {
            "deviceId": "1111",
        },
        value: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
    },
    {
        date: moment().subtract(1, "days").toDate(),
        labels: {
            "deviceId": "2222",
        },
        value: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
    },
    {
        date: moment().subtract(2, "days").toDate(),
        labels: {
            "deviceId": "2222",
        },
        value: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
    },
    {
        date: moment().subtract(3, "days").toDate(),
        labels: {
            "deviceId": "2222",
        },
        value: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
    },
    {
        date: moment().subtract(4, "days").toDate(),
        labels: {
            "deviceId": "2222",
        },
        value: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
    },
    {
        date: moment().subtract(5, "days").toDate(),
        labels: {
            "deviceId": "2222",
        },
        value: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
    },
];


export const connectionSpeedPoints: Point[] = [
    {
        date: moment().subtract(1, "days").toDate(),
        labels: {
            "sourceDeviceId": "1111",
            "destinationDeviceId": "2222",
        },
        value: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
    }
];