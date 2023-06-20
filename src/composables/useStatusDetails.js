import { computed, ref, reactive } from "vue";

export function useDeviceDetails() {
  let websocketConnection = "";
  if (location.protocol.includes("https"))
    websocketConnection = `wss://${location.host}`;
  else websocketConnection = `ws://${location.host}`;

  const status = ref({});

  const ws = new WebSocket(websocketConnection);

  ws.onmessage = function (event) {
    let message = JSON.parse(event.data);
    console.log("RECEIVED WEB MESSAGE INSIDE useDeviceDetails: ", message);
  };

  ws.onopen = function (event) {
    console.log(
      "Successfully connected to the echo websocket server from useDeviceDetails..."
    );
    ws.send(JSON.stringify({ message: "hello server" }));
  };

  return {
    status,
  };
}
