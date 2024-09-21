import SalaryComponent from './salary-component.entity.js';
import DeductionComponent from './deduction-component.entity.js';

interface IPayslip {
    employeeName: string;
    employeeID: string;
    designation: string;
    dateOfJoining: string;
    payPeriod: string;
    payDate: string;
    salaryComponents: SalaryComponent[];
    deductionComponents: DeductionComponent[];
    grossEarnings: number;
    totalDeductions: number;
    netPayable: number;
}

interface IPayslipEntity {
    employeeName: string;
    employeeID: string;
    designation: string;
    dateOfJoining: string;
    payPeriod: string;
    payDate: string;
    salaryComponents: SalaryComponent[];
    deductionComponents: DeductionComponent[];
    grossEarnings: number;
    totalDeductions: number;
    netPayable: number;
    validate(): void;
    get(): Readonly<IPayslip>;
}

export default class Payslip implements IPayslipEntity {
    employeeName: string;
    employeeID: string;
    designation: string;
    dateOfJoining: string;
    payPeriod: string;
    payDate: string;
    salaryComponents: SalaryComponent[];
    deductionComponents: DeductionComponent[];
    grossEarnings: number;
    totalDeductions: number;
    netPayable: number;

    constructor(data: IPayslip) {
        this.employeeName = data.employeeName;
        this.employeeID = data.employeeID;
        this.designation = data.designation;
        this.dateOfJoining = data.dateOfJoining;
        this.payPeriod = data.payPeriod;
        this.payDate = data.payDate;
        this.salaryComponents = data.salaryComponents;
        this.deductionComponents = data.deductionComponents;
        this.grossEarnings = data.grossEarnings;
        this.totalDeductions = data.totalDeductions;
        this.netPayable = data.netPayable;
    }

    validate() {
        // Add validation logic if necessary, e.g.:
        if (this.grossEarnings < 0 || this.totalDeductions < 0 || this.netPayable < 0) {
            throw new Error("Invalid payslip data");
        }
        if (!this.employeeName || !this.employeeID) {
            throw new Error("Employee details are missing");
        }
    }

    get(): Readonly<IPayslip> {
        return Object.freeze({
            employeeName: this.employeeName,
            employeeID: this.employeeID,
            designation: this.designation,
            dateOfJoining: this.dateOfJoining,
            payPeriod: this.payPeriod,
            payDate: this.payDate,
            salaryComponents: this.salaryComponents.map(s => s.get() as SalaryComponent),
            deductionComponents: this.deductionComponents.map(d => d.get() as DeductionComponent),
            grossEarnings: this.grossEarnings,
            totalDeductions: this.totalDeductions,
            netPayable: this.netPayable
        });
    }
    
}
