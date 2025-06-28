"use client";

import { useSelectedHouse } from "@/common/contexts/selected-house";
import { useSelectedNode } from "@/common/contexts/selected-node-context";
import { type Room } from "@/common/schemas/buildings/room";
import { client } from "@/common/trpc/client";
import NodeSidebar from "@/components/node-sidebar";
import ConnectionEdge, {
  ConnectionEdgeType,
} from "@/components/react-flow/connection-edge";
import DeviceNode, {
  DeviceNodeType,
} from "@/components/react-flow/device-node";
import FloatingConnectionLine from "@/components/react-flow/floating-connection-line";
import { Box, NativeSelect } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  Background,
  Controls,
  MarkerType,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();

  const { rooms } = useSelectedHouse();

  const { setSelectedNode } = useSelectedNode();
  const [nodes, setNodes, onNodesChange] = useNodesState<DeviceNodeType>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<ConnectionEdgeType>(
    [],
  );

  useEffect(() => {
    client.device.get
      .query({ roomId: [selectedRoom ? selectedRoom.id : "-1"] })
      .then((devices) => {
        return devices;
      })
      .then((devices) => {
        if (!devices || devices.length === 0) return;
        return client.map.getNodes
          .query({
            id: devices.map((device) => device.nodeId),
          })
          .then((nodes) => {
            const newNodes: DeviceNodeType[] = nodes
              .map((node) => {
                const device = devices.find(
                  (device) => device.nodeId === node.id,
                );
                if (!device) return;
                return {
                  id: node.id,
                  position: { x: node.x, y: node.y },
                  data: { device: device },
                  type: "devidceNode",
                };
              })
              .filter((node): node is DeviceNodeType => node !== null);
            setNodes(newNodes);
            return nodes;
          });
      })
      .then((nodes) => {
        if (!nodes || nodes.length === 0) return;

        client.map.getConnections
          .query({ sourceNodeId: nodes.map((node) => node.id) })
          .then((connections) => {
            const newConnections: ConnectionEdgeType[] = connections.flatMap(
              (connection) => ({
                id: connection.id,
                target: connection.targetNodeId,
                source: connection.sourceNodeId,
                data: {
                  state: connection.state,
                },
                type: "connection",
                markerEnd: { type: MarkerType.ArrowClosed },
              }),
            );

            setEdges(newConnections);
          });
      });
  }, [selectedRoom, setEdges, setNodes]);

  const [_, { open: opendDeviceSidebar }] = useDisclosure(false);

  const nodeTypes = useMemo(
    () => ({
      devidceNode: DeviceNode,
    }),
    [],
  );

  const edgeTypes = useMemo(
    () => ({
      connection: ConnectionEdge,
    }),
    [],
  );

  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        height: "75vh",
      }}
    >
      <NodeSidebar />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineComponent={FloatingConnectionLine}
        onNodeClick={(_, node) => {
          setSelectedNode(node);
          opendDeviceSidebar();
        }}
      >
        <Background gap={12} size={1} />
        <Panel position="top-left">
          <NativeSelect
            data={[
              { label: "Select room", value: "" },
              ...rooms.map((room) => ({
                label: room.name,
                value: room.id,
              })),
            ]}
            value={selectedRoom?.id || ""}
            onChange={(event) => {
              const selected = rooms.find(
                (room) => room.id === event.currentTarget.value,
              );
              setSelectedRoom(selected);
            }}
          ></NativeSelect>
        </Panel>

        <Controls />
      </ReactFlow>
    </Box>
  );
}
