'use client';
import { KeyIcon } from 'lucide-react';
import React, { useState } from 'react';
import { addEmployee } from '../../../../../../api/routes';

const Page = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeAddr, setEmployeeAddr] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      // Call the addEmployee function with the provided values
      await addEmployee(employeeName, employeeAddr, salary);
      setIsSubmitted(true); // After form submission, set the state to true
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <main className="flex-1 p-8">
        <div className="bg-gray-800 rounded-lg p-8 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Employee Onboarding</h2>
            <KeyIcon className="h-12 w-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-4">You are done!</h3>
          <p className="mb-4">
            We will send a mail to {employeeAddr}, asking them to complete their profile and put in details like bank information, phone number, etc. You can do this manually as well, by going to their{' '}
            <a href="#" className="text-blue-400 hover:underline">profile</a>. Until this is done, XPayroll will not process payments to {employeeAddr}.
          </p>
          <button className="mt-4">Return to dashboard</button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8">
      <div className="bg-gray-800 rounded-lg p-8 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Add a New Member</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="employeeName" className="block text-white mb-2">Employee Name:</label>
            <input
              type="text"
              id="employeeName"
              name="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="employeeAddr" className="block text-white mb-2">Employee Address (Email):</label>
            <input
              type="text"
              id="employeeAddr"
              name="employeeAddr"
              value={employeeAddr}
              onChange={(e) => setEmployeeAddr(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="salary" className="block text-white mb-2">Salary:</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Page;
