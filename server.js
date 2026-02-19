const express = require("express");
const cors = require("cors");
require("dotenv").config();



const authRoutes = require("./routes/authRoutes");
const guiderRoutes = require("./routes/guiderRoutes");

const app = express();



app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/guider", guiderRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
