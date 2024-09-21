import mongoose, { HydratedDocument, Model } from "mongoose";
import { IDeductionComponent } from "../../../interfaces/entity.interface.js";

const deductionComponentSchema = new mongoose.Schema<IDeductionComponent>(
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

export type IDBDeductionComponent = HydratedDocument<IDeductionComponent>;
export type IDeductionComponentModel = Model<IDeductionComponent>;

export default mongoose.model<IDeductionComponent>("DeductionComponent", deductionComponentSchema);
