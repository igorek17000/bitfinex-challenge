import NetworkStatus from "./comps/NetworkStatus";
import OrderBook from "./comps/OrderBook";
import SocketStatus from "./comps/SocketStatus";
import { css } from "./helpers/css";
import { connect } from "./helpers/ws";

connect();

function App() {
  return (
    <div
      className={css({
        flex: "col",
        w: "screen",
        h: "screen",
        overflow: "auto",
        bg: "primary",
        text: "white",
        p: 4,
        box: "border",
        sy: 4,
      })}
    >
      <div className={css({ flex: "row" })}>
        <SocketStatus />
        <NetworkStatus />
      </div>
      <div className={css({ flex: "row" })}>
        <OrderBook />
        <OrderBook sell />
      </div>
    </div>
  );
}

export default App;
