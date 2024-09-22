import Web3 from 'web3';
import PayrollSystemABI from '../src/lib/PayrollSystemABI.json'; 
const CONTRACT_ADDRESS = "0x70cd2b18044e877172431ef42ee318742b30fb93";

    let account;
    let companies;
    let employees;
    let companyName;
    let employeeAddr;
    let employeeName;
    let salary;
    let payableBalance;
    let payPeriod;
    let employeeID;
    let designation;
    let dateOfJoining;
    let salaryComponents;
    let deductionComponents;
    let errorMessage;

    const web3 = new Web3(window.ethereum); 
    const contract = new web3.eth.Contract(PayrollSystemABI, CONTRACT_ADDRESS);


    export const loadAccount = async () => {
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
                account = accounts[0];
                
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
  
  export const fetchCompanies = async () => {
    if (!account) {
        errorMessage ="No account connected. Please connect your wallet.";
        return;
    }

    console.log('Fetching company details for account:', account);

    try {
        const companyDetails = await contract.methods.companies(account).call({ from: account });
        console.log('Company Details:', companyDetails);
        companies =[companyDetails]; 
    } catch (error) {
        console.error('Error fetching company details:', error.message);
        errorMessage = 'Error fetching company details. Please try again.';
    }
};


export const fetchEmployees = async () => {
        const company = await contract.methods.companies(account).call();
        const employeeAddresses = company.employeeAddresses;
        employees = await Promise.all(employeeAddresses.map(async (addr) => {
            const details = await contract.methods.getEmployeeDetails(addr).call();
            return { name: details[0], wallet: details[1], balance: details[2], payableBalance: details[3], fullyPaid: details[4], salary: details[5] };
        })); 
    };

    export const addCompany = async () => {
        try {
          console.log('Company Details:', contract.methods.registerCompany);
            await contract.methods.registerCompany(companyName).send({ from: account });
            alert('Company registered!');
            // fetchCompanies();
        } catch (error) {
            handleError(error);
        }
    };

    export const addEmployee = async () => {
        try {
            await contract.methods.addEmployee(employeeAddr, employeeName, salary).send({ from: account });
            alert('Employee added!');
            fetchEmployees();
        } catch (error) {
            handleError(error);
        }
    };

    export const setInitialBalance = async () => {
        try {
            await contract.methods.setInitialPayableBalance(employeeAddr, payableBalance).send({ from: account });
            alert('Initial balance set!');
        } catch (error) {
            handleError(error);
        }
    };

    export const setComponents = async () => {
        try {
            const salaryComp = salaryComponents.map(comp => ({ name: comp.name, amount: comp.amount }));
            const deductionComp = deductionComponents.map(comp => ({ name: comp.name, amount: comp.amount }));
            await contract.methods.setComponents(employeeAddr, salaryComp, deductionComp).send({ from: account });
            alert('Components set!');
        } catch (error) {
            handleError(error);
        }
    };

    export const generatePayslip = async () => {
        try {
            await contract.methods.generatePayslip(employeeAddr, payPeriod, employeeID, designation, dateOfJoining).send({ from: account });
            alert('Payslip generated!');
        } catch (error) {
            handleError(error);
        }
    };

    export const updateSalary = async () => {
        try {
            await contract.methods.updateSalary(employeeAddr, salary).send({ from: account });
            alert('Salary updated!');
            fetchEmployees();
        } catch (error) {
            handleError(error);
        }
    };

    export  const getPayslips = async () => {
        try {
            const payslips = await contract.methods.getPayslips(employeeAddr).call();
            console.log(payslips); // Handle payslip data (display as needed)
        } catch (error) {
            handleError(error);
        }
    };

    export const handleError = (error) => {
        const message = error.message || 'An error occurred';
        errorMessage = message;
        alert(message);
    };

    











return (
    <div>
      <button onClick={loadAccount}>Connect acount</button>
      <button onClick={fetchCompanies}>Connect acount</button>

    
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