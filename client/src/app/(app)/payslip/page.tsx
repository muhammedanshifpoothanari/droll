'use client';
import { makeApiCall } from '@/lib/apicaller';
import { Download, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { selectEthereumAddress } from '@/redux/features/authSlice';
import { getPayslips } from '../../../../api/routes';
import PayrollSystemABI from '../../../lib/PayrollSystemABI.json';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CONTRACT_ADDRESS = "0x70cd2b18044e877172431ef42ee318742b30fb93";

function getMonthFromPayDate(payDate: number) {
  let payDateObject = new Date(payDate * 1000); // Multiply by 1000 to convert seconds to milliseconds
  let monthIndex = payDateObject.getMonth();
  return months[monthIndex];
}

export default function PaySlips() {
  const ethereumAddress = useSelector((state: RootState) => selectEthereumAddress(state));
  const [payslips, setPayslips] = useState<any[]>([]); // Initialize payslips as an empty array
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch payslips when the component mounts
  useEffect(() => {
    async function fetchPayslips() {
      if (ethereumAddress) {
        try {
          const data = await getPayslips(ethereumAddress as string);
          setPayslips(data); // Set the fetched payslips data
          setLoading(false); // Stop loading once data is fetched
        } catch (error) {
          console.error("Error fetching payslips:", error);
          setLoading(false); // Stop loading on error as well
        }
      }
    }
    fetchPayslips();
  }, [ethereumAddress]);

  return (
    <>
      {/* Pay Slips Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
        {/* WhatsApp Banner */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            
          </div>
          <div className="flex items-center">
            <a href="#" className="text-blue-400 hover:underline mr-4">Learn more</a>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Connect</button>
            <button className="ml-2 text-gray-400 hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Financial Year Selector and Download Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-64">
            <label htmlFor="financial-year" className="block text-sm font-medium text-gray-400 mb-1">
              Select financial year
            </label>
            <select
              id="financial-year"
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option selected>2024 - 2025</option>
            </select>
          </div>
          <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <Download className="h-5 w-5 mr-2" />
            Download Payslips
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-4">Click on the date to view the pay slip in a new window.</p>

        {/* Pay Slips Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {loading ? (
            <p className="text-gray-400 p-4">Loading payslips...</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Gross Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">In-hand Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {payslips.map((slip, index) => (
                  <tr key={index} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href="#" className="text-blue-400 hover:underline">{getMonthFromPayDate(slip.payDate)}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{slip.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{slip.grossSalary}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{slip.netPayable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <button className="mt-6 text-blue-400 hover:underline">Return to dashboard</button>
      </main>
    </>
  );
}
