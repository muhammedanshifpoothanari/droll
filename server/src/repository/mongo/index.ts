import buildEmployeeRepository from "./employee.repository.js";
import buildCompanyRepository from "./company.repository.js";
import buildPayslipRepository from "./payslip.repository.js";
import buildSalaryComponentRepository from "./salary-component.repository.js";
import buildDeductionComponentRepository from "./deduction-component.repository.js";

import employeeModel from "./models/employee.model.js";
import companyModel from "./models/company.model.js";
import payslipModel from "./models/payslip.model.js";
import salaryComponentModel from "./models/salary-component.model.js";
import deductionComponentModel from "./models/deduction-component.model.js";

export const salaryComponentRepository = buildSalaryComponentRepository({
    database: salaryComponentModel,
});

export const deductionComponentRepository = buildDeductionComponentRepository({
    database: deductionComponentModel,
});

export const companyRepository = buildCompanyRepository({
    database: companyModel,
});

export const payslipRepository = buildPayslipRepository({
    database: payslipModel,
});

export const employeeRepository = buildEmployeeRepository({
    database: employeeModel,
});