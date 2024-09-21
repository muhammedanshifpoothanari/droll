import { IPayslip } from "../../interfaces/entity.interface.js";
import { IPayslipRepository } from "../../interfaces/repository.interface.js";
import { IDBPayslip, IPayslipModel } from "./models/payslip.model.js";

export default function buildPayslipRepository({
    database,
}: {
    database: IPayslipModel;
}): IPayslipRepository {
    return Object.freeze({
        addPayslip: async (payslipData: IPayslip) => {
            return (await database.create(payslipData)) as IDBPayslip;
        },
        getPayslips: async () => {
            return (await database.find({})) as IDBPayslip[];
        },
        getPayslip: async ({ payslipId }: { payslipId: string }) => {
            return (await database.findOne({ _id: payslipId })) as IDBPayslip;
        },
        editPayslip: async ({
            payslipId,
            payslipData,
        }: {
            payslipId: string;
            payslipData: IPayslip;
        }) => {
            const response = await database.updateOne(
                { _id: payslipId },
                payslipData
            );
            return response.modifiedCount > 0;
        },
        removePayslip: async ({ payslipId }: { payslipId: string }) => {
            const response = await database.deleteOne({ _id: payslipId });
            return response.deletedCount > 0;
        },
    });
}
e