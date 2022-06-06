import { createSelector } from "reselect";
import { createSlice } from "../rtkex";

export type Order = {
  id: number;
  count: number;
  amount: number;
  price: number;
};
export type BookSliceState = { buy: Order[]; sell: Order[] };

const MAX_CACHED_ORDERS = 200;
const MAX_VISIBLE_ORDERS = 20;
const initialState: BookSliceState = { buy: [], sell: [] };

const reduceArray = <T>(array: T[], max: number) => {
  if (array.length > max) {
    array.splice(0, array.length - max);
  }
};

const sortOrdersByPrice = (desc: boolean) => (orders: Order[]) =>
  orders
    .slice()
    .sort(
      (a, b) =>
        (desc ? -1 : 1) * (a.price > b.price ? 1 : a.price < b.price ? -1 : 0)
    )
    .slice(0, MAX_VISIBLE_ORDERS);

export const bookSlice = createSlice("books", initialState, {
  push: (state, { payload: orders }: { payload: Order[] }) => {
    orders.forEach((order) => {
      // skip zero order
      if (!order.count) return;
      const isSellOrder = order.amount < 0;
      const array = isSellOrder ? state.sell : state.buy;
      array.push(isSellOrder ? { ...order, amount: -order.amount } : order);
      reduceArray(array, MAX_CACHED_ORDERS);
    });
  },
});

// define selectors
const selectBuyOrders = (state: any) => bookSlice.selector(state).buy;
const selectSellOrders = (state: any) => bookSlice.selector(state).sell;

export const selectOrderedBuyOrders = createSelector(
  selectBuyOrders,
  sortOrdersByPrice(true)
);

export const selectOrderedSellOrders = createSelector(
  selectSellOrders,
  sortOrdersByPrice(false)
);
