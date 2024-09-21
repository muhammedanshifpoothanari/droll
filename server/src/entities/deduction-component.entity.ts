interface IDeductionComponent {
    name: string;
    amount: number;
}

interface IDeductionComponentEntity {
    name: string;
    amount: number;
    validate(): void;
    get(): Readonly<IDeductionComponent>;
}

export default class DeductionComponent implements IDeductionComponentEntity {
    name: string;
    amount: number;

    constructor(data: IDeductionComponent) {
        this.name = data.name;
        this.amount = data.amount;
    }

    validate() {
        // Implement any validation logic here
        if (!this.name || this.amount < 0) {
            throw new Error("Invalid deduction component data");
        }
    }

    get() {
        return Object.freeze({
            name: this.name,
            amount: this.amount
        });
    }
}
