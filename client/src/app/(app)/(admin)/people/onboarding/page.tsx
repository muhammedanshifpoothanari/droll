import {   KeyIcon } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <main className="flex-1 p-8">
   

    <div className="bg-gray-800 rounded-lg p-8  mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Employee Onboarding</h2>
        <KeyIcon className="h-12 w-12 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold mb-4">You are done!</h3>
      <p className="mb-4">
        We will send a mail to Sdsdsd, asking them to complete their profile and put in details like bank information, phone number etc. You can do this manually as well, by going to their <a href="#" className="text-blue-400 hover:underline">profile</a>. Until this is done, XPayroll will not process payments to Sdsdsd.
      </p>
      <button   className="mt-4">
        Return to dashboard
      </button>
    </div>
  </main>
  )
}

export default page