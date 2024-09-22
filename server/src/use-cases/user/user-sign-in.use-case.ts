import {
    IUser,
    IUserEntityConstructor,
} from "../../interfaces/entity.interface.js";
import { IUserRepository } from "../../interfaces/repository.interface.js";
 
export default function buildUserSignInUseCase({
    databaseRepository,
    User,
}: {
    databaseRepository: IUserRepository;
    User: IUserEntityConstructor;
}) {
    return async (data: IUser) => {
        const UserEntity = new User(data);
        UserEntity.validate();
        const UserField = UserEntity.get();
        const document = await databaseRepository.signIn(UserField)
        return document;
    };
}