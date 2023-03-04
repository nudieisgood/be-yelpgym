import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import Gym from "./models/Gym.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

mongoose.connect("mongodb://localhost:27017/yelpgym");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "database connection error"));
db.once("open", () => {
  console.log("Mongo database connected");
});

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/gyms", async (req, res) => {
  const gyms = await Gym.find({});
  res.send({ gyms });
});

app.post("/gyms/new", async (req, res) => {
  const gym = new Gym(req.body);
  await gym.save();
  res.send({ newGymId: gym._id });
});

app.get("/gym/:id", async (req, res) => {
  const gym = await Gym.findById(req.params.id);
  res.send({ gym });
});

app.get("/", (req, res) => {
  res.send("exporess app is answering");
});

app.post("/gyms/:id/edit", async (req, res) => {
  console.log(req.body);
  const gym = await Gym.findByIdAndUpdate(req.params.id, { ...req.body });
  res.send({ newGymId: gym._id });
});

// app.get("/gyms/:id/delete", async (req, res) => {
//   const gym = await Gym.findByIdAndDelete(req.params.id);
//   res.status(200).send("ok");
// });

app.delete("/gyms/:id", async (req, res) => {
  const gym = await Gym.findByIdAndDelete(req.params.id);
  res.status(200).send("ok");
});
app.listen(3001, () => {
  console.log("backend yelpgym saving on 3001");
});

// import cities from "./seeds/cities.js";
// import { descriptors, names } from "./seeds/seedHelpers.js";

// const sample = (array) => array[Math.floor(Math.random() * array.length)];

// app.get("/makegym", async (req, res) => {
//   await Gym.deleteMany({});
//   for (let i = 0; i < 30; i++) {
//     const random1000 = Math.floor(Math.random() * 1000);
//     const price = Math.floor(Math.random() * 100) + 10;
//     const gym = new Gym({
//       location: `${cities[random1000].city}, ${cities[random1000].state}`,
//       title: `${sample(descriptors)} ${sample(names)}}`,
//       price: price,
//     });
//     await gym.save();
//   }
// });
