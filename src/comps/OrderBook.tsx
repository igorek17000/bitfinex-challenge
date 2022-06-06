import { Fragment } from "react";
import { css } from "../helpers/css";
import { useSelector } from "../rtkex";
import {
  selectOrderedBuyOrders,
  selectOrderedSellOrders,
} from "../slices/bookSlice";
import millify from "millify";

export type Props = {
  sell?: boolean;
};

const CENTER_COLUM = css({ text: "center", px: 4, py: 2 });
const RIGHT_COLUM = css({ text: "right", px: 4, py: 2 });

export default function OrderBook({ sell }: Props) {
  const orders = useSelector(
    sell ? selectOrderedSellOrders : selectOrderedBuyOrders
  );

  return (
    <>
      <div
        className={css({
          w: "1/2",
          font: "sm",
          bg: sell ? "red-700" : "green-700",
        })}
      >
        <div className={css({ grid: true, cols: 4, text: "uppercase" })}>
          <div className={CENTER_COLUM}>Count</div>
          <div className={RIGHT_COLUM}>Amount</div>
          <div className={RIGHT_COLUM}>Total</div>
          <div className={RIGHT_COLUM}>Price</div>
          {orders.map((order) => (
            <Fragment key={order.id}>
              <div className={CENTER_COLUM}>{millify(order.count)}</div>
              <div className={RIGHT_COLUM}>{millify(order.amount)}</div>
              <div className={RIGHT_COLUM}>
                {millify(order.amount * order.count)}
              </div>
              <div className={RIGHT_COLUM}>{order.price}</div>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
