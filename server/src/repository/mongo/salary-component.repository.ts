import { ISalaryComponent } from "../../interfaces/entity.interface.js";
import { ISalaryComponentRepository } from "../../interfaces/repository.interface.js";
import { IDBSalaryComponent, ISalaryComponentModel } from "./models/salary-component.model.js";

export default function buildSalaryComponentRepository({
    database,
}: {
    database: ISalaryComponentModel;
}): ISalaryComponentRepository {
    return Object.freeze({
        addSalaryComponent: async (componentData: ISalaryComponent) => {
            return (await database.create(componentData)) as IDBSalaryComponent;
        },
        getSalaryComponents: async () => {
            return (await database.find({})) as IDBSalaryComponent[];
        },
        getSalaryComponent: async ({ componentId }: { componentId: string }) => {
            return (await database.findOne({ _id: componentId })) as IDBSalaryComponent;
        },
        editSalaryComponent: async ({
            componentId,
            componentData,
        }: {
            componentId: string;
            componentData: ISalaryComponent;
        }) => {
            const response = await database.updateOne(
                { _id: componentId },
                componentData
            );
            return response.modifiedCount > 0;
        },
        removeSalaryComponent: async ({ componentId }: { componentId: string }) => {
            const response = await database.deleteOne({ _id: componentId });
            return response.deletedCount > 0;
        },
    });
}
