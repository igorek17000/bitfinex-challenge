import { createSlice } from "../rtkex";

export type Status = "connecting" | "connected" | "disconnected";

const initialState = "disconnected" as Status;

export const socketStatus = createSlice(
  "socketStatus",
  initialState as Status,
  { update: (_, { payload }: { payload: Status }) => payload }
);
