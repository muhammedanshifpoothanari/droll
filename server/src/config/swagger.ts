// import { loadEnv, logger } from "@express-assist/functions";
import { Express, Request, Response } from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

// const { PORT } = loadEnv(["PORT"]);

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node DB Design Service Docs",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://localhost:8000/api/user`,
            },
        ],
        components: {
            schemas: {
                table: {
                    properties: {
                        id: {
                            type: "string",
                            require: true,
                        },
                        name: {
                            type: "string",
                            require: true,
                        },
                        email: {
                            type: "string",
                            require: true,
                        },
                        username: {
                            type: "string",
                            required: true,
                        },
                        password: {
                            type: "string",
                            required: true,
                        },
                     
                    },
                },
              
            },
            securitySchemes: {
                userAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
               
            },
        },
        security: [
            {
                userAuth: [],
            },
        ],
    },
    apis: ["./routes/*.ts"], // Adjust the path to match your route files
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
    app.use(
        "/api/user/docs",
        swaggerUI.serve,
        swaggerUI.setup(swaggerSpec)
    );
    app.get("/api/user/docs", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    // logger.info(
    //     `Docs available\t: http://localhost:${port}/api/user/docs ${process.env.DB_URL}`
    // );
}

export default swaggerDocs;
