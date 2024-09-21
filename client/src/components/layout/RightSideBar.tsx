import React from 'react'

const RightSideBar = () => {
  return (
    <aside className="w-64 bg-gray-800 p-4">
        <h2 className="text-lg font-semibold mb-4">Your leave balance</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-400">PAID LEAVE</p>
          <p className="text-2xl font-bold">7/12</p>
        </div>
        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View Leaves Taken
        </button>
      </aside>
  )
}

export default RightSideBar