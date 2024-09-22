import { IEmployee, ICompany, IPayslip, ISalaryComponent, IDeductionComponent, IUser } from "./entity.interface.js";
import { IDBEmployee } from "../repository/mongo/models/employee.model.js";
import { IDBCompany } from "../repository/mongo/models/company.model.js";
import { IDBPayslip } from "../repository/mongo/models/payslip.model.js";
import { IDBSalaryComponent } from "../repository/mongo/models/salary-component.model.js";
import { IDBDeductionComponent } from "../repository/mongo/models/deduction-component.model.js";

  
  // Employee Repository Interface
  export type IEmployeeRepository = {
    addEmployee: (data: IEmployee) => Promise<IDBEmployee>;
    getEmployees: () => Promise<IDBEmployee[]>;
    getEmployee: (params: { employeeId: string }) => Promise<IDBEmployee | null>;
    editEmployee: (
      params: { employeeId: string; employeeData: IEmployee }
    ) => Promise<boolean>;
    removeEmployee: (params: { employeeId: string }) => Promise<boolean>;
  };
  
  // Company Repository Interface
  export type ICompanyRepository = {
    addCompany: (data: ICompany) => Promise<IDBCompany>;
    getCompanies: () => Promise<IDBCompany[]>;
    getCompany: (params: { companyId: string }) => Promise<IDBCompany | null>;
    editCompany: (
      params: { companyId: string; companyData: ICompany }
    ) => Promise<boolean>;
    removeCompany: (params: { companyId: string }) => Promise<boolean>;
  };
  
  // Payslip Repository Interface
  export type IPayslipRepository = {
    addPayslip: (data: IPayslip) => Promise<IDBPayslip>;
    getPayslips: () => Promise<IDBPayslip[]>;
    getPayslip: (params: { payslipId: string }) => Promise<IDBPayslip | null>;
    editPayslip: (
      params: { payslipId: string; payslipData: IPayslip }
    ) => Promise<boolean>;
    removePayslip: (params: { payslipId: string }) => Promise<boolean>;
  };
  
  // Salary Component Repository Interface
  export type ISalaryComponentRepository = {
    addSalaryComponent: (data: ISalaryComponent) => Promise<IDBSalaryComponent>;
    getSalaryComponents: () => Promise<IDBSalaryComponent[]>;
    getSalaryComponent: (
      params: { componentId: string }
    ) => Promise<IDBSalaryComponent | null>;
    editSalaryComponent: (
      params: { componentId: string; componentData: ISalaryComponent }
    ) => Promise<boolean>;
    removeSalaryComponent: (params: { componentId: string }) => Promise<boolean>;
  };
  export type IUserRepository = {
    signUp: (userData: IUser) => Promise<IUser>;
    updateUser: (password: string) => Promise<IUser>
    signIn: (userData: {
      email: string;
      password: string;
    }) => Promise<{ user: IUser; token: string }>;
  };
  // Deduction Component Repository Interface
  export type IDeductionComponentRepository = {
    addDeductionComponent: (
      data: IDeductionComponent
    ) => Promise<IDBDeductionComponent>;
    getDeductionComponents: () => Promise<IDBDeductionComponent[]>;
    getDeductionComponent: (
      params: { componentId: string }
    ) => Promise<IDBDeductionComponent | null>;
    editDeductionComponent: (
      params: { componentId: string; componentData: IDeductionComponent }
    ) => Promise<boolean>;
    removeDeductionComponent: (
      params: { componentId: string }
    ) => Promise<boolean>;
  };
  