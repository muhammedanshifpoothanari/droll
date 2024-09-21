import { Search, Bell, User, ChevronDown } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800">
          <h1 className="text-xl font-semibold">Leave & Attendance</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">We ♥ Hancod</span>
            <Search className="h-5 w-5" />
            <Bell className="h-5 w-5" />
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </header>
  )
}

export default Navbar 