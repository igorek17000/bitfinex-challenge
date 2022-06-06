import { configureStore } from "./rtkex";
import { bookSlice } from "./slices/bookSlice";
import { networkStatusSlice } from "./slices/networkStatusSlice";
import { socketStatus } from "./slices/socketStatusSlice";

export const store = configureStore((builder) =>
  builder
    .setPreloadedState({})
    .addSlice(bookSlice)
    .addSlice(networkStatusSlice)
    .addSlice(socketStatus)
);
