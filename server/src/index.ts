import app from "./app.js";
// import { loadEnv, logger } from "@express-assist/functions";
import "./config/index.js";

// const { PORT, SERVER_NAME } = loadEnv(["PORT", "SERVER_NAME"]);

app.listen(process.env.PORT, () => {
    if (!process.env.PORT) {
        // logger.info(`PORT NOT FOUND ON ${process.env.SERVER_NAME.toUpperCase()}`);
        return;
    }
    // logger.info(`Server started \t: http://localhost:${process.env.PORT}`);
});
