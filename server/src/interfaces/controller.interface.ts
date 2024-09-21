import { IRequest, ResponseCreator } from "@express-assist/functions";

export type IEmployeeController = {
    addUser: (req:IRequest) => Promise<ResponseCreator>
};
export type ICompanyController = {
    addUser: (req:IRequest) => Promise<ResponseCreator>
};
export type IPayslipController = {
    addUser: (req:IRequest) => Promise<ResponseCreator>
};
export type ISalaryComponentController = {
    addUser: (req:IRequest) => Promise<ResponseCreator>
};
export type IDeductionComponentController = {
    addUser: (req:IRequest) => Promise<ResponseCreator>
};