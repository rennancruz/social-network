const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Basic route for API readiness check
app.get("/", (req, res) => {
  res.send("API is running!");
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
});