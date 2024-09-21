import mongoose, { HydratedDocument, Model } from "mongoose";
import { ISalaryComponent } from "../../../interfaces/entity.interface.js";

const salaryComponentSchema = new mongoose.Schema<ISalaryComponent>(
    {
        name: {
            type: String,
            required: true,
        },
        amount: {
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

export type IDBSalaryComponent = HydratedDocument<ISalaryComponent>;
export type ISalaryComponentModel = Model<ISalaryComponent>;

export default mongoose.model<ISalaryComponent>("SalaryComponent", salaryComponentSchema);
