<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const cors = require("cors");
=======
>>>>>>> a43fa47b10bedaa6da57211b7acd47ee71be4387
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Routes
const authRoutes = require("./routes/authRoutes");
const port = 3000;
const app = express();

// Enable CORS for all routes
app.use(cors());

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

<<<<<<< HEAD
// Routes

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

const port = 3000;
=======
main();
>>>>>>> a43fa47b10bedaa6da57211b7acd47ee71be4387

app.get("/", (req, res) => {
  res.send("Welcome to Hiqqo-Quiz Api!");
});

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Hiqqo-Quiz app listening at http://localhost:${port}`);
});
