import { ICompany } from "../../interfaces/entity.interface.js";
import { ICompanyRepository } from "../../interfaces/repository.interface.js";
import { IDBCompany, ICompanyModel } from "./models/company.model.js";

export default function buildCompanyRepository({
    database,
}: {
    database: ICompanyModel;
}): ICompanyRepository {
    return Object.freeze({
        addCompany: async (companyData: ICompany) => {
            return (await database.create(companyData)) as IDBCompany;
        },
        getCompanies: async () => {
            return (await database.find({})) as IDBCompany[];
        },
        getCompany: async ({ companyId }: { companyId: string }) => {
            return (await database.findOne({ _id: companyId })) as IDBCompany;
        },
        editCompany: async ({
            companyId,
            companyData,
        }: {
            companyId: string;
            companyData: ICompany;
        }) => {
            const response = await database.updateOne(
                { _id: companyId },
                companyData
            );
            return response.modifiedCount > 0;
        },
        removeCompany: async ({ companyId }: { companyId: string }) => {
            const response = await database.deleteOne({ _id: companyId });
            return response.deletedCount > 0;
        },
    });
}
