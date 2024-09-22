'use client'
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import { fetchCompanies } from '../../../api/routes';

const Sidebar = () => {
  const currentPath = usePathname(); // Get the current path

  const menuItems = [
    { name: 'Dashboard', reference: 'dashboard' },
    { name: 'My Pay Slips', reference: 'payslip' },
    { name: 'Attendance', reference: 'attendance' },
    {name:"Onboarding", reference:"onboarding"}
  ];
  const [isAdmin,isSetAdmin] = useState<boolean>(false)
   useEffect(()=>{
    fetchCompanies().then(item=>item?.length!>0&&isSetAdmin(true))
   },[])

  return (
    <aside className="w-64 bg-gray-800 p-4">
      <div className="mb-8">
        <img src="/placeholder.svg?height=32&width=150" alt="RazorpayX Payroll" className="h-8" />
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = currentPath.includes(item.reference); // Compare with current path
            return (
              <li key={index}>
                <Link href={`/${item.reference.toLowerCase()}`} className={`flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                  <span className="mr-3">{getIcon(item.name)}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {isAdmin &&
      <div className="mt-8">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">ADMIN OPTIONS</h3>
        <ul className="space-y-2">
          {['People', 'people/onboarding', 'Approvals', 'Company Details', 'Settings']?.map((item, index) => (
            <li key={index}>
              <Link href={`/${item.toLocaleLowerCase()}`} className={`flex items-center p-2 rounded-lg ${item === 'People' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                {item}
                 
              </Link>
            </li>
          ))}
        </ul>
      </div>}
    </aside>
  );
};

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
