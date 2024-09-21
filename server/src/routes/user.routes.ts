import {  makeCallback } from "@express-assist/functions";
import { IUserController } from "../interfaces/controller.interface.js";
import { Router } from "express";

export default function buildUserRoutes({
    router,
    userController,
}: {
    router: Router;
    userController: IUserController;
}) {
    router.post(
        "/signup",
        makeCallback(userController.addUser)
    );
    return router
}