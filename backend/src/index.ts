import "dotenv/config";
import http from "http";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import { router } from "./router";
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
export const io = new Server(server);

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");

      next();
    });

    app.use(express.json());
    app.use(router);

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );

    server.listen(3001, () =>
      console.log(`Server is running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log("error: ", err));
