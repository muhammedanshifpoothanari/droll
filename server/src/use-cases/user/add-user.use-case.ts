import {
    IUser,
    IUserEntityConstructor,
} from "../../interfaces/entity.interface.js";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildAddUserUseCase({
    databaseRepository,
    User,
}: {
    databaseRepository: IDatabaseRepository;
    User: IUserEntityConstructor;
}) {
    return async (data: IUser) => {
        const UserEntity = new User(data);
        UserEntity.validate();
        const UserField = UserEntity.get();
        const table = await databaseRepository.addUser(UserField)
        return table;
    };
}