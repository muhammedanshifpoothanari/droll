import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { ErrorHandlingMiddleware  } from "@express-assist/functions";
import { userRoutes} from "./routes/index.js";
import { metricMiddleware } from "./config/metrics.js";

dotenv.config();
const app = express();

// const { CORS_ORIGINS } = loadEnv([
//     "PORT",
//     "SERVER_NAME",
//     "CORS_ORIGINS",
//     "NODE_ENV",
//     "ACCESS_TOKEN_SECRET",
// ]);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: "CORS_ORIGINS",
        credentials: true,
    })
);
// const stream = {
//     write: (message: string) => logger.http(message.trim()),
// };
// app.use(morgan("dev", { stream }));

app.use(metricMiddleware());

app.use("/api/user", userRoutes);

app.use(ErrorHandlingMiddleware);

export default app;
