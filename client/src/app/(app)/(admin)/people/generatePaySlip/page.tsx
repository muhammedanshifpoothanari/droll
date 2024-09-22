import React, { useState } from 'react';
import { generatePayslip } from '../../../../../../api/routes'; // Adjust path as needed

const GeneratePayslipForm = () => {
  const [employeeAddr, setEmployeeAddr] = useState('');
  const [payPeriod, setPayPeriod] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [designation, setDesignation] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await generatePayslip(employeeAddr, payPeriod, employeeID, designation, dateOfJoining);
      alert('Payslip generated!');
    } catch (error) {
      console.error('Error generating payslip:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Generate Payslip</h2>

      {/* Employee Address Input */}
      <div className="mb-4">
        <label htmlFor="employeeAddr" className="block text-white mb-2">
          Employee Address:
        </label>
        <input
          type="text"
          id="employeeAddr"
          value={employeeAddr}
          onChange={(e) => setEmployeeAddr(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md"
          required
        />
      </div>

      {/* Pay Period Input */}
      <div className="mb-4">
        <label htmlFor="payPeriod" className="block text-white mb-2">
          Pay Period:
        </label>
        <input
          type="text"
          id="payPeriod"
          value={payPeriod}
          onChange={(e) => setPayPeriod(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md"
          required
          placeholder="e.g. 2024-09"
        />
      </div>

      {/* Employee ID Input */}
      <div className="mb-4">
        <label htmlFor="employeeID" className="block text-white mb-2">
          Employee ID:
        </label>
        <input
          type="text"
          id="employeeID"
          value={employeeID}
          onChange={(e) => setEmployeeID(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md"
          required
        />
      </div>

      {/* Designation Input */}
      <div className="mb-4">
        <label htmlFor="designation" className="block text-white mb-2">
          Designation:
        </label>
        <input
          type="text"
          id="designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md"
          required
        />
      </div>

      {/* Date of Joining Input */}
      <div className="mb-4">
        <label htmlFor="dateOfJoining" className="block text-white mb-2">
          Date of Joining:
        </label>
        <input
          type="date"
          id="dateOfJoining"
          value={dateOfJoining}
          onChange={(e) => setDateOfJoining(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate Payslip
      </button>
    </form>
  );
};

export default GeneratePayslipForm;
