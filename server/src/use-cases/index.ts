import Employee from "../entities/employee.entity.js";
import Company from "../entities/company.entity.js";
import Payslip from "../entities/payslip.entity.js";
import SalaryComponent from "../entities/salary-component.entity.js";
import DeductionComponent from "../entities/deduction-component.entity.js";

import { ICompanyUseCases, IEmployeeUseCases, IPayslipUseCases, ISalaryComponentUseCases, IDeductionComponentUseCases } from "../interfaces/use-cases.interface.js";
import { employeeRepository, companyRepository, payslipRepository, salaryComponentRepository, deductionComponentRepository } from "../repository/mongo/index.js";

// add here
import buildAddUserUseCase from "./user/add-user.use-case.js";
import buildUserSignInUseCase from "./user/user-sign-in.use-case.js";

const addUser = buildAddUserUseCase({
    databaseRepository,
    User
});

const signIn = buildUserSignInUseCase({
    User
})

// export const employeeUseCases: IEmployeeUseCases = Object.freeze({
   
// })
// export const companyUseCases: ICompanyUseCases = Object.freeze({
   
// })
// export const payslipUseCases: IPayslipUseCases = Object.freeze({
   
// })
// export const salaryComponentUseCases: ISalaryComponentUseCases = Object.freeze({
   
// })
// export const deductionComponentUseCases: IDeductionComponentUseCases = Object.freeze({
   
// })