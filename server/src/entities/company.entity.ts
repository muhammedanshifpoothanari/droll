import { IEmployee } from '../interfaces/entity.interface.js';
import { ICompany, ICompanyEntity } from '../interfaces/entity.interface.js';

export default class Company implements ICompanyEntity {
    name: string;
    owner: string;
    employees: Record<string, IEmployee>;
    employeeAddresses: string[];

    constructor(data: ICompany) {
        this.name = data.name;
        this.owner = data.owner;
        this.employees = data.employees || {};
        this.employeeAddresses = data.employeeAddresses || [];
    }

    validate() {
        if (!this.owner || !/^0x[a-fA-F0-9]{40}$/.test(this.owner)) {
            throw new Error('Invalid owner address');
        }

        if (!this.name || typeof this.name !== 'string') {
            throw new Error('Invalid company name');
        }

        if (this.employeeAddresses.some(addr => !/^0x[a-fA-F0-9]{40}$/.test(addr))) {
            throw new Error('Invalid employee address in employeeAddresses');
        }
    }

    get() {
        return Object.freeze({
            name: this.name,
            owner: this.owner,
            employees: this.employees,
            employeeAddresses: this.employeeAddresses,
        });
    }
}
