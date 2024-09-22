import React, { useState } from 'react';
import { setComponents } from '../../../../../../api/routes'; // Adjust path as needed

const SetComponentForm = () => {
  const [employeeAddr, setEmployeeAddr] = useState('');
  const [salaryComponents, setSalaryComponents] = useState([{ name: '', amount: '' }]);
  const [deductionComponents, setDeductionComponents] = useState([{ name: '', amount: '' }]);

  const handleAddSalaryComponent = () => {
    setSalaryComponents([...salaryComponents, { name: '', amount: '' }]);
  };

  const handleAddDeductionComponent = () => {
    setDeductionComponents([...deductionComponents, { name: '', amount: '' }]);
  };

  const handleSalaryComponentChange = (index, field, value) => {
    const newSalaryComponents = [...salaryComponents];
    newSalaryComponents[index][field] = value;
    setSalaryComponents(newSalaryComponents);
  };

  const handleDeductionComponentChange = (index, field, value) => {
    const newDeductionComponents = [...deductionComponents];
    newDeductionComponents[index][field] = value;
    setDeductionComponents(newDeductionComponents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setComponents(employeeAddr, salaryComponents, deductionComponents);
      alert('Components set!');
    } catch (error) {
      console.error('Error setting components:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Set Components for Employee</h2>

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

      {/* Salary Components */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-white">Salary Components</h3>
        {salaryComponents.map((comp, index) => (
          <div key={index} className="flex space-x-4 mb-2">
            <input
              type="text"
              placeholder="Component Name"
              value={comp.name}
              onChange={(e) => handleSalaryComponentChange(index, 'name', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={comp.amount}
              onChange={(e) => handleSalaryComponentChange(index, 'amount', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSalaryComponent}
          className="text-blue-400 hover:underline"
        >
          Add Salary Component
        </button>
      </div>

      {/* Deduction Components */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-white">Deduction Components</h3>
        {deductionComponents.map((comp, index) => (
          <div key={index} className="flex space-x-4 mb-2">
            <input
              type="text"
              placeholder="Component Name"
              value={comp.name}
              onChange={(e) => handleDeductionComponentChange(index, 'name', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={comp.amount}
              onChange={(e) => handleDeductionComponentChange(index, 'amount', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDeductionComponent}
          className="text-blue-400 hover:underline"
        >
          Add Deduction Component
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Set Components
      </button>
    </form>
  );
};

export default SetComponentForm;
