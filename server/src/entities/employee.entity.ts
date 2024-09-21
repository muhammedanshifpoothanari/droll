import Payslip from './payslip.entity.js';

interface IEmployee {
    name: string;
    wallet: string;
    balance: number;
    active: boolean;
    salary: number;
    payslips: Payslip[];
    salaryHistoryCount: number;
}

interface IEmployeeEntity {
    name: string;
    wallet: string;
    balance: number;
    active: boolean;
    salary: number;
    payslips: Payslip[];
    salaryHistoryCount: number;
    validate(): void;
    get(): Readonly<IEmployee>;
}

export default class Employee implements IEmployeeEntity {
    name: string;
    wallet: string;
    balance: number;
    active: boolean;
    salary: number;
    payslips: Payslip[];
    salaryHistoryCount: number;

    constructor(data: IEmployee) {
        this.name = data.name;
        this.wallet = data.wallet;
        this.balance = data.balance;
        this.active = data.active;
        this.salary = data.salary;
        this.payslips = data.payslips;
        this.salaryHistoryCount = data.salaryHistoryCount;
    }

    validate() {
        if (!this.wallet || !/^0x[a-fA-F0-9]{40}$/.test(this.wallet)) {
            throw new Error("Invalid wallet address");
        }
        if (this.salary < 0 || this.balance < 0) {
            throw new Error("Salary or balance cannot be negative");
        }
    }

    get(): Readonly<IEmployee> {
        return Object.freeze({
            name: this.name,
            wallet: this.wallet,
            balance: this.balance,
            active: this.active,
            salary: this.salary,
            payslips: this.payslips.map(p => p.get() as Readonly<Payslip>),
            salaryHistoryCount: this.salaryHistoryCount
        });
    }
}
