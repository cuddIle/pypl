import { useSelectedNode } from "@/common/contexts/selected-node-context";
import { type Device } from "@/common/schemas/devices/device";
import { Box, Group } from "@mantine/core";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import DeviceIcon from "../device-icon";

export type DeviceNodeType = Node<
  {
    device: Device;
  },
  "device"
>;

export default function DeviceNode(props: NodeProps<DeviceNodeType>) {
  const { selectedNode } = useSelectedNode();

  return (
    <>
      <Group pos="relative">
        <Box
          pos="absolute"
          style={{
            left: "48%",
            top: "52%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 80%)",
            transform: "translate(-50%, -50%)",
            opacity: selectedNode?.id == props.data.device.nodeId ? 1 : 0,
            transition: "opacity 0.3s",
            pointerEvents: "none",
          }}
        />
        <DeviceIcon device={props.data.device} size={80} />
        <Handle type="source" position={Position.Top} id="1" hidden />
        <Handle type="target" position={Position.Top} id="2" hidden />
      </Group>
    </>
  );
}
