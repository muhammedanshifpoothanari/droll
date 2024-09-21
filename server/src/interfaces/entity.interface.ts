/* SalaryComponent */
export type ISalaryComponent = {
    name: string;
    amount: number;
};

export interface ISalaryComponentEntity extends ISalaryComponent {
    validate: () => void;
    get: () => ISalaryComponent;
}

export interface ISalaryComponentEntityConstructor {
    new (data: ISalaryComponent): ISalaryComponentEntity;
}

/* DeductionComponent */
export type IDeductionComponent = {
    name: string;
    amount: number;
};

export interface IDeductionComponentEntity extends IDeductionComponent {
    validate: () => void;
    get: () => IDeductionComponent;
}

export interface IDeductionComponentEntityConstructor {
    new (data: IDeductionComponent): IDeductionComponentEntity;
}

/* Payslip */
export type IPayslip = {
    employeeName: string;
    employeeID: string;
    designation: string;
    dateOfJoining: string;
    payPeriod: string;
    payDate: string;
    salaryComponents: ISalaryComponent[];
    deductionComponents: IDeductionComponent[];
    grossEarnings: number;
    totalDeductions: number;
    netPayable: number;
};

export interface IPayslipEntity extends IPayslip {
    validate: () => void;
    get: () => IPayslip;
}

export interface IPayslipEntityConstructor {
    new (data: IPayslip): IPayslipEntity;
}

/* Employee */
export type IEmployee = {
    name: string;
    wallet: string;
    balance: number;
    active: boolean;
    salary: number;
    payslips: IPayslip[];
    salaryHistoryCount: number;
};

export interface IEmployeeEntity extends IEmployee {
    validate: () => void;
    get: () => IEmployee;
}

export interface IEmployeeEntityConstructor {
    new (data: IEmployee): IEmployeeEntity;
}

export type ICompany = {
    name: string;
    owner: string;  // Solidity address will be a string in TypeScript
    employees: Record<string, IEmployee>;  // Mapping of address to Employee
    employeeAddresses: string[];  // Array of employee wallet addresses
};

export interface ICompanyEntity extends ICompany {
    validate: () => void;
    get: () => ICompany;
}

export interface ICompanyEntityConstructor {
    new (data: ICompany): ICompanyEntity;
}
