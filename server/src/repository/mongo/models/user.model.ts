import mongoose, { HydratedDocument, Model } from "mongoose";
import {  IUser } from "../../../interfaces/entity.interface.js";

const userSchema = new mongoose.Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
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

export type IDBSalaryComponent = HydratedDocument<IUser>;
export type IUserModel = Model<IUser>;

export default mongoose.model<IUser>("SalaryComponent", userSchema);
