import { w3cwebsocket as W3CWebSocket } from "websocket";
import hmacSHA384 from "crypto-js/hmac-sha384";
import { enc } from "crypto-js";
import { store } from "../store";
import { bookSlice } from "../slices/bookSlice";
import { socketStatus } from "../slices/socketStatusSlice";

type Response = { event: string; channel: string; chanId: number };

const apiKey = "5w576EjnaKWmN6Es3xh5FZELsU0qeUwEjZ7Joy7kJnY";
const apiSecret = "sUbErU9QIy2QLgXewnPBNwGgdajvhVxr1jCzr2xp3JU";

let wss: W3CWebSocket | undefined;

export const disconnect = () => {
  wss?.close();
  wss = undefined;
  store.dispatch(socketStatus.actions.update("disconnected"));
};

export const connect = () => {
  wss = new W3CWebSocket("wss://api-pub.bitfinex.com/ws/2");
  const authNonce = Date.now() * 1000;
  const authPayload = "AUTH" + authNonce;
  const authSig = hmacSHA384(authPayload, apiSecret).toString(enc.Hex); // The authentication payload is hashed using the private key, the resulting hash is output as a hexadecimal string

  const payload = {
    apiKey, //API key
    authSig, //Authentication Sig
    authNonce,
    authPayload,
    filter: ["trading"],
    event: "auth", // The connection event, will always equal 'auth'
  };

  let orderId = 1;
  let subscribedChannelId: number | undefined;

  store.dispatch(socketStatus.actions.update("connecting"));

  wss.onmessage = (message) => {
    if (typeof message.data === "string") {
      const json = JSON.parse(message.data);
      if (Array.isArray(json)) {
        // is message from subscribed channel id
        if (json[0] === subscribedChannelId) {
          const data = json[1] as any[];
          // the data might be single record or multiple records of tuple [price, count, amount]
          const orderTuples = Array.isArray(data[0]) ? data : [data];
          // create an action payload
          const payload = bookSlice.actions.push(
            orderTuples.map((x) => ({
              id: orderId++,
              count: parseFloat(x[1]) || 0,
              price: parseFloat(x[0]) || 0,
              amount: parseFloat(x[2]) || 0,
            }))
          );
          store.dispatch(payload);
        }
      } else {
        const response = json as Response;
        const { event, chanId } = response;
        if (event === "auth") {
          store.dispatch(socketStatus.actions.update("connected"));
          wss?.send(
            JSON.stringify({
              channel: "book",
              event: "subscribe",
              freq: "F0",
              len: "100",
              prec: "P0",
              subId: "book/tBTCUSD/P0",
              symbol: "tBTCUSD",
            })
          );
        } else if (event === "subscribed") {
          subscribedChannelId = chanId;
        }
      }
    }
  };

  wss.onopen = () => wss?.send(JSON.stringify(payload));
};
