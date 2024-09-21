import { IDeductionComponent } from "../../interfaces/entity.interface.js";
import { IDeductionComponentRepository } from "../../interfaces/repository.interface.js";
import { IDBDeductionComponent, IDeductionComponentModel } from "./models/deduction-component.model.js";

export default function buildDeductionComponentRepository({
    database,
}: {
    database: IDeductionComponentModel;
}): IDeductionComponentRepository {
    return Object.freeze({
        addDeductionComponent: async (componentData: IDeductionComponent) => {
            return (await database.create(componentData)) as IDBDeductionComponent;
        },
        getDeductionComponents: async () => {
            return (await database.find({})) as IDBDeductionComponent[];
        },
        getDeductionComponent: async ({ componentId }: { componentId: string }) => {
            return (await database.findOne({ _id: componentId })) as IDBDeductionComponent;
        },
        editDeductionComponent: async ({
            componentId,
            componentData,
        }: {
            componentId: string;
            componentData: IDeductionComponent;
        }) => {
            const response = await database.updateOne(
                { _id: componentId },
                componentData
            );
            return response.modifiedCount > 0;
        },
        removeDeductionComponent: async ({ componentId }: { componentId: string }) => {
            const response = await database.deleteOne({ _id: componentId });
            return response.deletedCount > 0;
        },
    });
}
