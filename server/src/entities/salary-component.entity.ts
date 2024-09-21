interface ISalaryComponent {
    name: string;
    amount: number;
}

interface ISalaryComponentEntity {
    name: string;
    amount: number;
    validate(): void;
    get(): Readonly<ISalaryComponent>;
}

export default class SalaryComponent implements ISalaryComponentEntity {
    name: string;
    amount: number;

    constructor(data: ISalaryComponent) {
        this.name = data.name;
        this.amount = data.amount;
    }

    validate() {
        // Implement any validation logic here
        if (!this.name || this.amount <= 0) {
            throw new Error("Invalid salary component data");
        }
    }

    get() {
        return Object.freeze({
            name: this.name,
            amount: this.amount
        });
    }
}
