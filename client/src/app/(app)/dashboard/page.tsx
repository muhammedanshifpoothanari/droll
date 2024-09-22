'use client'
import { useEffect, useState } from "react";
import { addCompany, fetchEmployees, fetchCompanies } from "../../../../api/routes";

export default function Component() {
  const [isEmploy, isAvailableEmploy] = useState<any>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    const fetchEmployData = async () => {
      const employLength: any = await fetchEmployees(); // Assume it fetches a list of employees
      if (employLength && employLength.length > 0) {
        isAvailableEmploy(true);
      } else {
        isAvailableEmploy(false);
      }
    };

    const fetchCompanyData = async () => {
      const companyData: any = await fetchCompanies(); // Fetch companies data
      setCompanies(companyData);
    };

    fetchEmployData();
    fetchCompanyData();
  }, []);

  const handleRegisterCompany = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle company registration logic
    addCompany(companyName);
    console.log("Registering company:", companyName);
  };

  if (isEmploy === null) {
    return <div>Loading...</div>; // Show loading state while data is fetched
  }

  if (!isEmploy) {
    return (
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
        <div className="bg-gray-800 rounded-lg p-6  mx-auto">
          <h2 className="text-xl font-semibold mb-4">Register Your Company</h2>
          <form onSubmit={handleRegisterCompany}>
            <div className="mb-4">
              <label htmlFor="companyName" className="block text-white mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>

        {/* Table of Companies */}
        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Companies List</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Company Name
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {companies.map((company, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">{company.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{company.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Dashboard Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Reminders */}
          <div className="col-span-2 bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Reminders</h2>
            <p>
              Please consider{" "}
              <a href="#" className="text-blue-400 hover:underline">
                uploading a photo
              </a>{" "}
              of yourself.
            </p>
          </div>

          {/* Quick links */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-400 hover:underline">
                  View personal transactions
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-400 hover:underline">
                  Employee directory
                </a>
              </li>
            </ul>
          </div>

          {/* Welcome Message */}
          <div className="col-span-3 bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold">Welcome</h2>
            <p className="text-2xl font-bold">
              Anshad KT <span className="text-gray-400 text-sm">(109)</span>
            </p>
            <p className="text-gray-400">Jr. Full Stack Developer, Development</p>
          </div>
        </div>
      </main>
    </>
  );
}
