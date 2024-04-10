import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { useUser } from "@/context/userContext";

const RoomSelection = () => {
  const { handleSelectRoom } = useUser();

  return (
    <div className="w-4/5 ">
      <Select onValueChange={handleSelectRoom}>
        <SelectTrigger>
          <SelectValue placeholder="Select a room" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Rooms</SelectLabel>
            <SelectItem value="room1">Room 1</SelectItem>
            <SelectItem value="room2">Room 2</SelectItem>
            <SelectItem value="room3">Room 3</SelectItem>
            <SelectItem value="room4">Room 4</SelectItem>
            <SelectItem value="room5">Room 5</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoomSelection;
