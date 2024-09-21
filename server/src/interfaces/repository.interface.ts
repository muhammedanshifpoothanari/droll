import { IEmployee, ICompany, IPayslip, ISalaryComponent, IDeductionComponent } from "./entity.interface.js";
import { IDBEmployee } from "../repository/mongo/models/employee.model.js";
import { IDBCompany } from "../repository/mongo/models/company.model.js";
import { IDBPayslip } from "../repository/mongo/models/payslip.model.js";
import { IDBSalaryComponent } from "../repository/mongo/models/salary-component.model.js";
import { IDBDeductionComponent } from "../repository/mongo/models/deduction-component.model.js";

export type IEmployeeRepository = {
    addEmployee: (data:IEmployee) => Promise<IDBEmployee>
};
export type ICompanyRepository = {
    addUser: (data:ICompany) => Promise<IDBCompany>
};
export type IPayslipRepository = {
    addUser: (data:IPayslip) => Promise<IDBPayslip>
};
export type ISalaryComponentRepository = {
    addUser: (data:ISalaryComponent) => Promise<IDBSalaryComponent>
};
export type IDeductionComponentRepository = {
    addUser: (data:IDBDeductionComponent) => Promise<IDBDeductionComponent>
};
