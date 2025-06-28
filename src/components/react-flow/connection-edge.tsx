import { ConnectionState } from "@/common/schemas/maps/connection";
import {
  BaseEdge,
  type Edge,
  type EdgeProps,
  getStraightPath,
  type ReactFlowState,
  useInternalNode,
  useStore,
} from "@xyflow/react";
import { getEdgeParams } from "./initial-elements.js";

export type ConnectionEdgeType = Edge<{ state: ConnectionState }, "connection">;

export default function ConnectionEdge({
  id,
  source,
  target,
  markerEnd,
  style,
  data,
}: EdgeProps<ConnectionEdgeType>) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  const isBiDirectionEdge = useStore((s: ReactFlowState) => {
    const edgeExists = s.edges.some(
      (e) =>
        (e.source === target && e.target === source) ||
        (e.target === source && e.source === target),
    );
    return edgeExists;
  });

  if (!sourceNode || !targetNode) {
    return;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode,
  );

  const edgePathParams = {
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  };

  // If the edge is bi-directional, we need to adjust the path to avoid overlap
  if (isBiDirectionEdge) {
    if (Math.abs(sx - tx) > Math.abs(sy - ty)) {
      if (sx < tx) {
        edgePathParams.sourceY += 5;
        edgePathParams.targetY += 5;
      }
      if (sx > tx) {
        edgePathParams.sourceY -= 5;
        edgePathParams.targetY -= 5;
      }
    } else {
      if (sx < tx) {
        edgePathParams.sourceX += 5;
        edgePathParams.targetX += 5;
      }
      if (sx > tx) {
        edgePathParams.sourceX -= 5;
        edgePathParams.targetX -= 5;
      }
    }
  }

  const [path] = getStraightPath(edgePathParams);

  switch (data?.state) {
    case ConnectionState.ACTIVE: {
      style = {
        stroke: "#00C853",
      };
      break;
    }
    case ConnectionState.INACTIVE: {
      style = {
        stroke: "#FF5722",
      };
      break;
    }
    case ConnectionState.IDLE: {
      style = {
        stroke: "#00CB8F",
      };
      break;
    }
    case ConnectionState.DEPRECATED: {
      style = {
        stroke: "#9E9E9E",
      };
      break;
    }
  }

  return (
    <>
      <BaseEdge id={id} path={path} markerEnd={markerEnd} style={style} />
    </>
  );
}
