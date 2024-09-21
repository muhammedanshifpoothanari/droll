import mongoose, { HydratedDocument, Model } from "mongoose";
import { ICompany } from "../../../interfaces/entity.interface.js";
import Employee from './employee.model.js';

const companySchema = new mongoose.Schema<ICompany>(
    {
        name: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
            validate: {
                validator: function (v: string) {
                    return /^0x[a-fA-F0-9]{40}$/.test(v);
                },
                message: (props: any) => `${props.value} is not a valid Ethereum address!`
            }
        },
        employees: {
            type: Map,
            of: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Employee'
            }
        },
        employeeAddresses: {
            type: [String],
            validate: {
                validator: function (v: string[]) {
                    return v.every(addr => /^0x[a-fA-F0-9]{40}$/.test(addr));
                },
                message: (props: any) => `Invalid address found in employeeAddresses`
            }
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

export type IDBCompany = HydratedDocument<ICompany>;
export type ICompanyModel = Model<ICompany>;

export default mongoose.model<ICompany>("Company", companySchema);
