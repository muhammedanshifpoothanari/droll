import mongoose, { HydratedDocument, Model } from "mongoose";
import { IPayslip } from "../../../interfaces/entity.interface.js";
import SalaryComponent from './salary-component.model.js';
import DeductionComponent from './deduction-component.model.js';

const payslipSchema = new mongoose.Schema<IPayslip>(
    {
        employeeName: {
            type: String,
            required: true,
        },
        employeeID: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        dateOfJoining: {
            type: String,
            required: true,
        },
        payPeriod: {
            type: String,
            required: true,
        },
        payDate: {
            type: String,
            required: true,
        },
        salaryComponents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SalaryComponent',
        }],
        deductionComponents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DeductionComponent',
        }],
        grossEarnings: {
            type: Number,
            required: true,
        },
        totalDeductions: {
            type: Number,
            required: true,
        },
        netPayable: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

export type IDBPayslip = HydratedDocument<IPayslip>;
export type IPayslipModel = Model<IPayslip>;

export default mongoose.model<IPayslip>("Payslip", payslipSchema);
