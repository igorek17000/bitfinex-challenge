import { useState } from "react";
import { useNetworkStatus } from "react-network-status";
import { useDispatch } from "react-redux";
import { css } from "../helpers/css";
import { networkStatusSlice } from "../slices/networkStatusSlice";

const config = {
  timeout: 5000,
  interval: 1000,
};

export default function NetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState(true);
  const dispatch = useDispatch();

  useNetworkStatus((networkStatusUpdate) => {
    dispatch(networkStatusSlice.actions.update(networkStatusUpdate));
    setNetworkStatus(networkStatusUpdate);
  }, config);

  return (
    <div
      className={css({
        text: [networkStatus ? "green" : "red", "center"],
        font: "bold",
        p: 4,
      })}
    >
      You are: {networkStatus ? "online" : "offline"}
    </div>
  );
}
