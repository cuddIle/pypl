"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type Room } from "../schemas/buildings/room";
import { client } from "../trpc/client";

interface SelectedHouseContextType {
  selectedHouse: string | undefined;
  deviceIds: string[];
  rooms: Room[];
  selectHouse: (houseId: string) => void;
}

const SelectedHouseContext = createContext<
  SelectedHouseContextType | undefined
>(undefined);

export function SelectedHouseProvider({ children }: { children: ReactNode }) {
  const [selectedHouse, setSelectedHouse] = useState<string | undefined>();
  const [deviceIds, setDeviceIds] = useState<string[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const storedHouse = localStorage.getItem("selectedHouse");
    const storedDeviceIds = localStorage.getItem("deviceIds");
    const storedRooms = localStorage.getItem("rooms");

    if (storedHouse) {
      setSelectedHouse(JSON.parse(storedHouse));
    }
    if (storedDeviceIds) {
      setDeviceIds(JSON.parse(storedDeviceIds));
    }
    if (storedRooms) {
      setRooms(JSON.parse(storedRooms));
    }
  }, []);

  const selectHouse = (houseId: string) => {
    client.building.house.get
      .query({ id: [houseId] })
      .then((houses) => {
        if (houses.length === 0) {
          setSelectedHouse(undefined);
          localStorage.setItem("selectedHouse", "");
          return;
        }

        const selectedHouseResult = houses[0].id;

        setSelectedHouse(selectedHouseResult);
        localStorage.setItem(
          "selectedHouse",
          JSON.stringify(selectedHouseResult),
        );

        return selectedHouseResult;
      })
      .then((selectedHouse) => {
        if (!selectedHouse) {
          setDeviceIds([]);
          return;
        }

        client.device.get
          .query({ houseId: [selectedHouse] })
          .then((devices) => {
            const deviceIdsResult = devices.map((device) => device.id);
            setDeviceIds(deviceIdsResult);
            localStorage.setItem("deviceIds", JSON.stringify(deviceIdsResult));
          });

        client.building.room.get
          .query({ houseId: [selectedHouse] })
          .then((roomsResult) => {
            setRooms(roomsResult);
            localStorage.setItem("rooms", JSON.stringify(roomsResult));
          });
      });
  };

  return (
    <SelectedHouseContext.Provider
      value={{ selectedHouse, deviceIds, rooms, selectHouse }}
    >
      {children}
    </SelectedHouseContext.Provider>
  );
}

export function useSelectedHouse() {
  const ctx = useContext(SelectedHouseContext);
  if (!ctx)
    throw new Error(
      "useSelectedHouse must be used within a SelectedHouseContext",
    );
  return ctx;
}
