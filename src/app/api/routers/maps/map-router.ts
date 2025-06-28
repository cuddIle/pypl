import {
  type Connection,
  connectionFilterSchema,
  connectionSchema,
  ConnectionState,
} from "@/common/schemas/maps/connection";
import { type DeviceNode, deviceNodeFilterSchema, deviceNodeSchema } from "@/common/schemas/maps/node";
import { createTRPCRouter, publicProcedure } from "@/common/trpc/init";
import { z } from "zod";

const nodes: DeviceNode[] = Array.from({ length: 100 }, (_, i) => {
  const deviceId = (i + 1).toString();

  return {
    deviceId: deviceId,
    id: Number(deviceId + 1_005_532).toString(8),
    x: Math.floor(i * 200),
    y: Math.floor(i * 50),
  };
});

const connections: Connection[] = Array.from({ length: Math.floor(nodes.length / 2) }, (_, i) => {
  const sourceNode = nodes[i * 2];
  const targetNode = nodes[i * 2 + 1];
  const baseId = i + 423_424;
  return i % 2 === 0 ? [
      {
        id: baseId.toString(8),
        sourceNodeId: sourceNode.id,
        targetNodeId: targetNode.id,
        state:[
          ConnectionState.ACTIVE,
          ConnectionState.IDLE,
          ConnectionState.INACTIVE,
          ConnectionState.DEPRECATED,
        ][i % 4],
      },
      {
        id: (baseId + 10_000).toString(8),
        sourceNodeId: targetNode.id,
        targetNodeId: sourceNode.id,
        state:[
          ConnectionState.ACTIVE,
          ConnectionState.IDLE,
          ConnectionState.INACTIVE,
          ConnectionState.DEPRECATED,
        ][i % 4]
      },
    ] : [
      {
        id: baseId.toString(8),
        sourceNodeId: sourceNode.id,
        targetNodeId: targetNode.id,
        state:[
          ConnectionState.ACTIVE,
          ConnectionState.IDLE,
          ConnectionState.INACTIVE,
          ConnectionState.DEPRECATED,
        ][i % 4]
      },
    ];
}).flat();

export const mapRouter = createTRPCRouter({
  getNodes: publicProcedure
    .input(deviceNodeFilterSchema)
    .output(z.array(deviceNodeSchema))
    .query(async opts => {
      const filter = opts.input;
      return nodes.filter(node => {
        return (
          (!filter.id || filter.id.includes(node.id)) &&
          (!filter.deviceId || filter.deviceId.includes(node.deviceId))
        );
      });
    }),
  getConnections: publicProcedure
    .input(connectionFilterSchema)
    .output(z.array(connectionSchema))
    .query(async opts => {
      const filter = opts.input;
      return connections.filter(connection => {
        return (
          (!filter.id || filter.id.includes(connection.id)) &&
          (!filter.sourceNodeId || filter.sourceNodeId.includes(connection.sourceNodeId)) &&
          (!filter.targetNodeId || filter.targetNodeId.includes(connection.targetNodeId)) &&
          (!filter.state || filter.state.includes(connection.state))
        );
      });
    }),
});
