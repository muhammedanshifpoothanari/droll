
import { ICompanyController, IEmployeeController, IPayslipController, ISalaryComponentController, IDeductionComponentController } from "../interfaces/controller.interface.js";
import { companyUseCases, employeeUseCases, payslipUseCases, salaryComponentUseCases, deductionComponentUseCases } from "../use-cases/index.js";

// add here
import buildUserSignupController from "./user/user-signup.controller.js";

const addUser = buildUserSignupController({userUseCases})

export const companyController: ICompanyController = Object.freeze({
    addUser
});
export const employeeController: IEmployeeController = Object.freeze({
    addUser
});
export const payslipController: IPayslipController = Object.freeze({
    addUser
});
export const salaryComponentController: ISalaryComponentController = Object.freeze({
    addUser
});
export const deductionComponentController: IDeductionComponentController = Object.freeze({
    addUser
});