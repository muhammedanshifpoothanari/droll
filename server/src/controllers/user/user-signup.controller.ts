import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@express-assist/functions";
import {  IUserUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildUserSignupController({
    userUseCases,
}: {
    userUseCases: IUserUseCases;
}) {
    return async (req: IRequest) => {

        const userData = req.body;
        console.log(userData);
        
        validateBody(userData, ["name", "username", "password", "avatar","email"]);

        const field = await userUseCases.addUser({
           email: userData.email,
           name: userData.name,
           username: userData.username,
           avatar: userData.avatar,
           password: userData.password
        });

        const response = new ResponseCreator();

        return response
            .setMessage("User Account Created")
            .setStatusCode(201)
            .setData(field);
    };
}
