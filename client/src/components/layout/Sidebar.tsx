import { ChevronDown } from 'lucide-react';
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', reference: 'dashboard' },
    { name: 'My Pay Slips', reference: 'payslip' },
    { name: 'Attendance', reference: 'attendance' },
    { name: 'Tax Deductions', reference: 'tax-deductions' },
    { name: 'Reimbursements', reference: 'reimbursements' },
    { name: 'Documents', reference: 'documents' },
    { name: 'Help', reference: 'help' }
  ];

  return (
    <aside className="w-64 bg-gray-800 p-4">
      <div className="mb-8">
        <img src="/placeholder.svg?height=32&width=150" alt="RazorpayX Payroll" className="h-8" />
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems?.map((item, index) => (
            <li key={index}>
              <Link href={"/" + item?.reference.toLowerCase()} className={`flex items-center p-2 rounded-lg ${item?.name === 'Attendance' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                <span className="mr-3">{getIcon(item?.name)}</span>
                {item?.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">ADMIN OPTIONS</h3>
          <ul className="space-y-2">
            {['People', 'Pay Employees',   'Approvals',  'Company Details', 'Settings'].map((item, index) => (
              <li key={index}>
                <a href="#" className={`flex items-center p-2 rounded-lg ${item === 'People' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                  {item}
                  {(item === 'Pay Employees' || item === 'Pay Contractors') && (
                    <ChevronDown className="ml-auto h-4 w-4" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
    </aside>
  );
}

export default Sidebar;

function getIcon(item: string) {
  switch (item) {
    case 'Dashboard': return '📊';
    case 'My Pay Slips': return '📄';
    case 'Attendance': return '📅';
    case 'Tax Deductions': return '💰';
    case 'Reimbursements': return '💳';
    case 'Documents': return '📁';
    case 'Help': return '❓';
    default: return '•';
  }
}
