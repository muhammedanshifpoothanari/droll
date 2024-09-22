import { ethers } from "ethers";

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employeeAddr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			}
		],
		"name": "addEmployee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employeeAddr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "payPeriod",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "employeeID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "designation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dateOfJoining",
				"type": "string"
			}
		],
		"name": "generatePayslip",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employeeAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "makePayment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "employee",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "employeeName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "employeeID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "designation",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dateOfJoining",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "payPeriod",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "payDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "grossEarnings",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDeductions",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "netPayable",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct PayrollSystem.Payslip",
				"name": "payslip",
				"type": "tuple"
			}
		],
		"name": "PayslipGenerated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "registerCompany",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "employee",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newSalary",
				"type": "uint256"
			}
		],
		"name": "SalaryUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employeeAddr",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"internalType": "struct PayrollSystem.SalaryComponent[]",
				"name": "salaryComponents",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"internalType": "struct PayrollSystem.DeductionComponent[]",
				"name": "deductionComponents",
				"type": "tuple[]"
			}
		],
		"name": "setComponents",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employeeAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "newSalary",
				"type": "uint256"
			}
		],
		"name": "updateSalary",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "companies",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "employeePayslips",
		"outputs": [
			{
				"internalType": "string",
				"name": "employeeName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "employeeID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "designation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dateOfJoining",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "payPeriod",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "payDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "grossEarnings",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalDeductions",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "netPayable",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employeeAddr",
				"type": "address"
			}
		],
		"name": "getComponents",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"internalType": "struct PayrollSystem.SalaryComponent[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"internalType": "struct PayrollSystem.DeductionComponent[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEmployees",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employeeAddr",
				"type": "address"
			}
		],
		"name": "getPayslips",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "employeeName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "employeeID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "designation",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dateOfJoining",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "payPeriod",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "payDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "grossEarnings",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDeductions",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "netPayable",
						"type": "uint256"
					}
				],
				"internalType": "struct PayrollSystem.Payslip[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


const contractAddress = "0xd14e8dbefd97cb0757de0248623a9ee0ac00ea69";

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  return contract;
};

export const addEmployee = async (employeeAddr, name, salary) => {
  const contract = await getContract();
  const tx = await contract.addEmployee(employeeAddr, name, ethers.utils.parseUnits(salary, 18));
  return tx;
};

export const getEmployees = async () => {
  const contract = await getContract();
  const employees = await contract.getEmployees();
  return employees;
};

