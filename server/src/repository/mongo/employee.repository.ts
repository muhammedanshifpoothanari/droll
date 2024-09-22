import { IEmployee } from "../../interfaces/entity.interface.js";
import { IEmployeeRepository } from "../../interfaces/repository.interface.js";
import { IDBEmployee, IEmployeeModel } from "./models/employee.model.js";

export default function buildEmployeeRepository({
    database,
}: {
    database: IEmployeeModel;
}): IEmployeeRepository {
    return Object.freeze({
        addEmployee: async (employeeData: IEmployee) => {
            return (await database.create(employeeData)) as IDBEmployee;
        },
        getEmployees: async () => {
            return (await database.find({})) as IDBEmployee[];
        },
        getEmployee: async ({ employeeId }: { employeeId: string }) => {
            return (await database.findOne({ _id: employeeId })) as IDBEmployee;
        },
        editEmployee: async ({
            employeeId,
            employeeData,
        }: {
            employeeId: string;
            employeeData: IEmployee;
        }) => {
            const response = await database.updateOne(
                { _id: employeeId },
                employeeData
            );
            return response.modifiedCount > 0;
        },
        removeEmployee: async ({ employeeId }: { employeeId: string }) => {
            const response = await database.deleteOne({ _id: employeeId });
            return response.deletedCount > 0;
        },
    });
}
 