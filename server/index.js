require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Routes
const authRoutes = require("./routes/authRoutes");
const port = 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database`);
  } catch (err) {
    console.log(`Error in connecting to database ${err}`);
  }
};

main();

app.get("/", (req, res) => {
  res.send("Welcome to Hiqqo-Quiz Api!");
});

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Hiqqo-Quiz app listening at http://localhost:${port}`);
});
