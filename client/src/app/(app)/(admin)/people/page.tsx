'use client'
import React, { useEffect, useState } from 'react';
import { fetchEmployees } from '../../../../../api/routes';

const Page = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEmployees = async () => {
      const employeeData = await fetchEmployees();
      setEmployees(employeeData);
      setLoading(false);
    };

    getEmployees();
  }, []);

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
      {/* WhatsApp Banner */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/placeholder.svg?height=40&width=40" alt="WhatsApp" className="mr-4 h-10 w-10" />
          <span>Now get your past month payslips on WhatsApp within seconds!</span>
        </div>
        <div className="flex items-center">
          <a href="#" className="text-blue-400 hover:underline mr-4">Learn more</a>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Connect</button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {loading ? (
          <p className="text-gray-400 p-4">Loading employees...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Wallet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Payable Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Fully Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Salary
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {employees?.map((employee:any, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">{employee?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee?.wallet}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{employee?.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{employee?.payableBalance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee?.fullyPaid ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{employee?.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button className="mt-6 text-blue-400 hover:underline">Return to dashboard</button>
    </main>
  );
};

export default Page;
