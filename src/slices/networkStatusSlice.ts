import { createSlice } from "../rtkex";

export const networkStatusSlice = createSlice("networkStatus", true, {
  update: (_, { payload }: { payload: boolean }) => payload,
});
