import { Server } from "http";
import app from "./app";

const PORT = 3000;
let server: Server;

async function start() {
  server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

start();
