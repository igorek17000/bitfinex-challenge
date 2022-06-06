import useCallback from "recallback";
import { css } from "../helpers/css";
import { connect, disconnect } from "../helpers/ws";
import { useSelector } from "../rtkex";
import { socketStatus } from "../slices/socketStatusSlice";

export default function SocketStatus() {
  const status = useSelector(socketStatus.selector);
  const handleClick = useCallback(() => {
    if (status === "connecting") return;
    if (status === "connected") {
      disconnect();
    } else {
      connect();
    }
  });

  return (
    <button
      className={css({
        bg: {
          hover:
            status === "connecting"
              ? "gray-600"
              : status === "connected"
              ? "green-600"
              : "red-600",
          $:
            status === "connecting"
              ? "gray"
              : status === "connected"
              ? "green"
              : "red",
        },
        text: ["white", "uppercase"],
        py: 2,
        px: 4,
        r: "md",
        b: 0,
      })}
      disabled={status === "connecting"}
      onClick={handleClick}
    >
      {status}
    </button>
  );
}
