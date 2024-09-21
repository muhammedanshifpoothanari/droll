import "../repository/sql/connect.js";

import swaggerDocs from "./swagger.js";
import app from "../app.js";
// import { loadEnv } from "@express-assist/functions";
import { metrics } from "./metrics.js";

// const { PORT } = loadEnv(["PORT"]);
swaggerDocs(app, Number(3000));
metrics(app, Number(3000));
