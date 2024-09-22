'use client';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import PayrollSystemABI from '../lib/PayrollSystemABI.json'; 
import { Button } from '@/components/ui/button';

const CONTRACT_ADDRESS = "0x0e2356a386979bd75b3dfc9a17db3f55024a490b";

const Payroll = () => {
    const [account, setAccount] = useState('');
    const [companies, setCompanies] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [employeeAddr, setEmployeeAddr] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [salary, setSalary] = useState(0);
    const [payableBalance, setPayableBalance] = useState(0);
    const [payPeriod, setPayPeriod] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [designation, setDesignation] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [salaryComponents, setSalaryComponents] = useState([['Bonus','100']]);
    const [deductionComponents, setDeductionComponents] = useState([['Tax','1000']]);
    const [errorMessage, setErrorMessage] = useState('');

    const web3 = new Web3(window.ethereum) ;
     
    const contract = new web3.eth.Contract(PayrollSystemABI, CONTRACT_ADDRESS);

    // useEffect(() => {
    //     loadAccount();
    // }, []);
    
    const loadAccount = async () => {
      if (window.ethereum) {
          try {
              // Request account access
              const data = await window.ethereum.request({ method: 'eth_requestAccounts' });
              console.log('data',data);
              
              // Fetch accounts
                  const accounts = await ethereum.request({ method: 'eth_accounts' });

              // const accounts = await web3.eth.getAccounts();
              console.log('hygytyttytyty', accounts); // Check here
  
              if (accounts.length > 0) {
                  setAccount(accounts[0]);
                
              } else {
                  console.error("No accounts found");
              }
          } catch (error) {
              console.error("Error connecting to MetaMask", error);
          }
      } else {
          alert('Please install MetaMask!');
      }
  };
  
  const getAllEmployees = async () => {
    if (!account) {
        setErrorMessage("No account connected. Please connect your wallet.");
        return;
    }

    try {
        // Assuming getEmployees is a view method that doesn't require gas estimation
        const employees = await contract.methods.getEmployees().call({ from: account });
        
        console.log('Employee Details:', employees);
        
        setEmployees(employees); // Update the employees state directly
        return employees;
    } catch (error) {
        console.error('Error fetching employee details:', error);
        setErrorMessage('Error fetching employee details. Please try again.');
    }
};



  const fetchCompanies = async () => {
    if (!account) {
        setErrorMessage("No account connected. Please connect your wallet.");
        return;
    }

    console.log(contract.methods.companies, "akjnjbhhjg");

    try {
        // Estimating gas for the method call
        const estimatedGas = await contract.methods.companies(account).estimateGas({ from: account });
        console.log('Estimated Gas:', estimatedGas);

        // Using the estimated gas to set the gas limit
        const companyDetails = await contract.methods.companies(account).call({ from: account, gas: Number(estimatedGas) });

        console.log('Company Details:', companyDetails);
        setCompanies([companyDetails]); // Store the company details
    } catch (error) {
        console.error('Error fetching company details:', error);
        setErrorMessage('Error fetching company details. Please try again.');
    }
};






    const fetchEmployees = async () => {
        const details1 = await getAllEmployees()
        const employeeAddresses = details1
        console.log(employeeAddresses,"--------",details1);
        console.log();
        // const details = await contract.methods.getEmployeeDetails('0x3965f61F00aeB3771a5738b0681b4d08A683e017').call();
        // console.log(details,"--------------------------------------------------------------");
        
        const employeeData = await Promise.all(employeeAddresses.map(async (addr) => {
            const details = await contract.methods.getEmployeeDetails(addr).call();
            return { name: details[0], wallet: details[1], balance: details[2], payableBalance: details[3], fullyPaid: details[4], salary: details[5] };
        }));

        setEmployees(employeeData);
    };

    const addCompany = async () => {
        try {
          console.log('Company Details:', contract.methods.registerCompany);
            await contract.methods.registerCompany(companyName).send({ from: account });
            alert('Company registered!');
            // fetchCompanies();
        } catch (error) {
            handleError(error);
        }
    };

    const addEmployee = async () => {
        try {
            console.log();
            
            const name = employeeName
            console.log("-----",name,"2222222",employeeName,employeeAddr,"slaryssss",salary);
             await contract.methods.addEmployee(employeeAddr, name, salary).send({ from: account });
            alert('Employee added!');
            await getAllEmployees()
                } catch (error) {
            handleError(error);
        }
    };

    const setInitialBalance = async () => {
        try {
            await contract.methods.setInitialPayableBalance(employeeAddr, payableBalance).send({ from: account });
            alert('Initial balance set!');
        } catch (error) {
            handleError(error);
        }
    };

    const setComponents = async () => {
        try {
            const salaryComp = salaryComponents.map((comp,idx) => ({ name: comp[0], amount: comp[1] }));
            const deductionComp = deductionComponents.map(comp => ({ name: comp[0], amount: comp[1] }));
            console.log(salaryComp,deductionComp,"llll");
            
            await contract.methodsetComponentss("0xe349F22a43E183d236C147eb4F4E95F152Efa827", salaryComp, deductionComp).send({ from: account });
            alert('Components set!');
        } catch (error) {
            handleError(error);
        }
    };

    const generatePayslip = async () => {
        try {
            await contract.methods.generatePayslip(employeeAddr, payPeriod, employeeID, designation, dateOfJoining).send({ from: account });
            alert('Payslip generated!');
        } catch (error) {
            handleError(error);
        }
    };

    const updateSalary = async () => {
        try {
            await contract.methods.updateSalary(employeeAddr, salary).send({ from: account });
            alert('Salary updated!');
            fetchEmployees();
        } catch (error) {
            handleError(error);
        }
    };

    const getPayslips = async () => {
        try {
            const payslips = await contract.methods.getPayslips(employeeAddr).call();
            console.log(payslips); // Handle payslip data (display as needed)
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error) => {
        const message = error.message || 'An error occurred';
        setErrorMessage(message);
        alert(message);
    };

    return (
        <div>
          <button onClick={loadAccount}>Connect acount</button>
          <button onClick={fetchCompanies}>Fetch company</button>
        <button onClick={fetchEmployees}>Fetch employees</button>
        
            <h1>Payroll System</h1>
            <h2>Connected Account: {account}</h2>
            <h2>Add Company</h2>
            <input type="text" placeholder="Company Name" onChange={(e) => setCompanyName(e.target.value)} />
            <button onClick={addCompany}>Add Company</button>

            <h2>Add Employee</h2>
            <input type="text" placeholder="Employee Address" onChange={(e) => setEmployeeAddr(e.target.value)} />
            <input type="text" placeholder="Employee Name" onChange={(e) => setEmployeeName(e.target.value)} />
            <input type="number" placeholder="Salary" onChange={(e) => setSalary(Number(e.target.value))} />
            <button onClick={addEmployee}>Add Employee</button>

            <h2>Set Initial Balance</h2>
            <input type="text" placeholder="Employee Address" onChange={(e) => setEmployeeAddr(e.target.value)} />
            <input type="number" placeholder="Initial Balance" onChange={(e) => setPayableBalance(Number(e.target.value))} />
            <button onClick={setInitialBalance}>Set Initial Balance</button>

            <h2>Set Components</h2>
            <button onClick={setComponents}>Set Components</button>

            <h2>Generate Payslip</h2>
            <input type="text" placeholder="Employee Address" onChange={(e) => setEmployeeAddr(e.target.value)} />
            <input type="text" placeholder="Pay Period" onChange={(e) => setPayPeriod(e.target.value)} />
            <input type="text" placeholder="Employee ID" onChange={(e) => setEmployeeID(e.target.value)} />
            <input type="text" placeholder="Designation" onChange={(e) => setDesignation(e.target.value)} />
            <input type="text" placeholder="Date of Joining" onChange={(e) => setDateOfJoining(e.target.value)} />
            <button onClick={generatePayslip}>Generate Payslip</button>

            <h2>Update Salary</h2>
            <input type="text" placeholder="Employee Address" onChange={(e) => setEmployeeAddr(e.target.value)} />
            <input type="number" placeholder="New Salary" onChange={(e) => setSalary(Number(e.target.value))} />
            <button onClick={updateSalary}>Update Salary</button>

            <h2>Get Payslip</h2> 
            <input type="text" placeholder="Employee Address" onChange={(e) => setEmployeeAddr(e.target.value)} />
            <button onClick={getPayslips}>Get Payslip</button>

            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
    );
};

export default Payroll;
