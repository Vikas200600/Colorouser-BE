const express = require("express");
const app = express();

const routes = require("./src/routes/routes");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/api", routes);

app.listen(3000, () => {
  console.log("server started at port 3000");
});
