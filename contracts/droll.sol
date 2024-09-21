// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract PayrollSystem {
    struct SalaryComponent {
        string name;
        uint256 amount;
    }

    struct DeductionComponent {
        string name;
        uint256 amount;
    }

    struct Payslip {
        string employeeName;
        string employeeID;
        string designation;
        string dateOfJoining;
        string payPeriod;
        uint256 payDate;
        uint256 grossEarnings;
        uint256 totalDeductions;
        uint256 netPayable;
    }

    struct Employee {
        string name;
        address wallet;
        uint256 balance;
        bool active;
        uint256 salary;
        uint256 salaryHistoryCount;
    }

    struct Company {
        string name;
        address owner;
        mapping(address => Employee) employees;
        address[] employeeAddresses;
    }

    struct EmployeeComponents {
        SalaryComponent[] salaryComponents;
        DeductionComponent[] deductionComponents;
    }

    mapping(address => Company) public companies;
    mapping(address => mapping(address => Payslip[])) public employeePayslips; // Payslips
    mapping(address => mapping(address => EmployeeComponents)) internal employeeComponents; // Salary and Deduction components

    event PayslipGenerated(address indexed employee, Payslip payslip);
    event SalaryUpdated(address indexed employee, uint256 newSalary);

    modifier onlyOwner() {
        require(msg.sender == companies[msg.sender].owner, "Not authorized");
        _;
    }

    function registerCompany(string memory name) public {
        companies[msg.sender].name = name;
        companies[msg.sender].owner = msg.sender;
    }

    function addEmployee(address employeeAddr, string memory name, uint256 salary) public onlyOwner {
        Employee memory newEmployee = Employee({
            name: name,
            wallet: employeeAddr,
            balance: 0,
            active: true,
            salary: salary,
            salaryHistoryCount: 0
        });

        companies[msg.sender].employees[employeeAddr] = newEmployee;
        companies[msg.sender].employeeAddresses.push(employeeAddr);
    }

    function updateSalary(address employeeAddr, uint256 newSalary) public onlyOwner {
        Employee storage employee = companies[msg.sender].employees[employeeAddr];
        require(employee.active, "Employee is not active");
        employee.salary = newSalary;
        employee.salaryHistoryCount += 1;
        emit SalaryUpdated(employeeAddr, newSalary);
    }

    function makePayment(address employeeAddr, uint256 amount) public onlyOwner {
        Employee storage employee = companies[msg.sender].employees[employeeAddr];
        require(employee.active, "Employee is not active");
        employee.balance += amount;
    }

    function setComponents(
        address employeeAddr,
        SalaryComponent[] memory salaryComponents,
        DeductionComponent[] memory deductionComponents
    ) public onlyOwner {
        for (uint256 i = 0; i < salaryComponents.length; i++) {
            employeeComponents[msg.sender][employeeAddr].salaryComponents.push(salaryComponents[i]);
        }
        for (uint256 j = 0; j < deductionComponents.length; j++) {
            employeeComponents[msg.sender][employeeAddr].deductionComponents.push(deductionComponents[j]);
        }
    }

    function generatePayslip(
        address employeeAddr,
        string memory payPeriod,
        string memory employeeID,
        string memory designation,
        string memory dateOfJoining
    ) public onlyOwner {
        Employee storage employee = companies[msg.sender].employees[employeeAddr];
        require(employee.active, "Employee is not active");

        uint256 grossEarnings = 0;
        uint256 totalDeductions = 0;

        SalaryComponent[] storage salaryComponents = employeeComponents[msg.sender][employeeAddr].salaryComponents;
        DeductionComponent[] storage deductionComponents = employeeComponents[msg.sender][employeeAddr].deductionComponents;

        for (uint256 i = 0; i < salaryComponents.length; i++) {
            grossEarnings += salaryComponents[i].amount;
        }

        for (uint256 j = 0; j < deductionComponents.length; j++) {
            totalDeductions += deductionComponents[j].amount;
        }

        uint256 netPayable = grossEarnings - totalDeductions;

        Payslip memory newPayslip = Payslip({
            employeeName: employee.name,
            employeeID: employeeID,
            designation: designation,
            dateOfJoining: dateOfJoining,
            payPeriod: payPeriod,
            payDate: block.timestamp,
            grossEarnings: grossEarnings,
            totalDeductions: totalDeductions,
            netPayable: netPayable
        });

        employeePayslips[msg.sender][employeeAddr].push(newPayslip);

        emit PayslipGenerated(employeeAddr, newPayslip);
    }

    function getPayslips(address employeeAddr) public view returns (Payslip[] memory) {
        return employeePayslips[msg.sender][employeeAddr];
    }

    function getEmployees() public view returns (address[] memory) {
        return companies[msg.sender].employeeAddresses;
    }

    function getComponents(address employeeAddr) public view returns (SalaryComponent[] memory, DeductionComponent[] memory) {
        return (
            employeeComponents[msg.sender][employeeAddr].salaryComponents,
            employeeComponents[msg.sender][employeeAddr].deductionComponents
        );
    }
}
