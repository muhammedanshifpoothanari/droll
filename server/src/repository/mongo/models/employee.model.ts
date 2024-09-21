import mongoose, { HydratedDocument, Model } from "mongoose";
import { IEmployee } from "../../../interfaces/entity.interface.js";
// import Payslip from './Payslip.model.js';

const employeeSchema = new mongoose.Schema<IEmployee>(
    {
        name: {
            type: String,
            required: true,
        },
        wallet: {
            type: String,
            required: true,
        },
        balance: {
            type: Number,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        payslips: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payslip',
        }],
        salaryHistoryCount: {
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

export type IDBEmployee = HydratedDocument<IEmployee>;
export type IEmployeeModel = Model<IEmployee>;

export default mongoose.model<IEmployee>("Employee", employeeSchema);
