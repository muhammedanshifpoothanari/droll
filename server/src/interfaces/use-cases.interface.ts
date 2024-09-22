import { ICompany, IEmployee, IPayslip, ISalaryComponent, IDeductionComponent, IUser } from "./entity.interface.js";
import { IDBEmployee } from "../repository/mongo/models/employee.model.js";
import { IDBCompany } from "../repository/mongo/models/company.model.js";
import { IDBPayslip } from "../repository/mongo/models/payslip.model.js";
import { IDBSalaryComponent } from "../repository/mongo/models/salary-component.model.js";
import { IDBDeductionComponent } from "../repository/mongo/models/deduction-component.model.js";

export type IEmployeeUseCases = {
    addEmployee: (data: IEmployee) => Promise<IDBEmployee>
}
export type ICompanyUseCases = {
    createCompany: (data: ICompany) => Promise<IDBCompany>
}
export type IPayslipUseCases = {
    createPayslip: (data: IPayslip) => Promise<IDBPayslip>
}
export type ISalaryComponentUseCases = {
    createSalaryComponent: (data: ISalaryComponent) => Promise<IDBSalaryComponent>
}
export type IDeductionComponentUseCases = {
    createDeductionComponent: (data: IDeductionComponent) => Promise<IDBDeductionComponent>
}

export type IUserUseCases = {
    signUp: (userData: IUser) => Promise<IUser>;
    signIn: (userData: {
        email: string;
        password: string;
    }) => Promise<{ user: IUser; token: string }>;
    resendCode: ({ email }: {
        email: string;
    }) => Promise<void>
};