'use client'
import { ChevronLeft, ChevronRight, Edit2 } from 'lucide-react'
import { useState } from 'react'

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const calendarDays = [
  { day: 1, status: 'inactive' },
  { day: 2, status: 'present' },
  { day: 3, status: 'present' },
  { day: 4, status: 'present' },
  { day: 5, status: 'present' },
  { day: 6, status: 'present' },
  { day: 7, status: 'inactive' },
  { day: 8, status: 'inactive' },
  { day: 9, status: 'present' },
  { day: 10, status: 'present' },
  { day: 11, status: 'present' },
  { day: 12, status: 'present' },
  { day: 13, status: 'holiday' },
  { day: 14, status: 'inactive' },
  { day: 15, status: 'inactive' },
  { day: 16, status: 'present' },
  { day: 17, status: 'present' },
  { day: 18, status: 'present' },
  { day: 19, status: 'present' },
  { day: 20, status: 'holiday' },
  { day: 21, status: 'today' },
  { day: 22, status: 'inactive' },
  { day: 23, status: 'holiday' },
  { day: 24, status: 'future' },
  { day: 25, status: 'future' },
  { day: 26, status: 'future' },
  { day: 27, status: 'future' },
  { day: 28, status: 'future' },
  { day: 29, status: 'future' },
  { day: 30, status: 'future' },
]

export default function LeaveAttendance() {
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [selectedRequests, setSelectedRequests] = useState<number[]>([])

  // Define current month and year
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
  const currentYear = currentDate.getFullYear()

  const openRequests = [
    { id: 1, content: 'You have requested status Present, check in at 09:07, check out at 18:07 on 13 Sep (Friday).' },
    { id: 2, content: 'You have requested status Paid Leave on 20 Sep (Friday).\nRemarks: Paid leave due to tech event' },
    { id: 3, content: 'You have requested status Paid Leave on 23 Sep (Monday).\nRemarks: Paid leave due to tech event' },
  ]

  const attendanceData = [
    { date: '01/09/2024', status: 'Weekend', checkIn: '', checkOut: '', duration: '', remarks: 'Weekend' },
    { date: '02/09/2024', status: 'Present', checkIn: '08:31', checkOut: '18:04', duration: '09:33', remarks: '-NA-' },
    { date: '03/09/2024', status: 'Present', checkIn: '08:38', checkOut: '18:01', duration: '09:23', remarks: '-NA-' },
  ]

  const toggleRequestSelection = (id: number) => {
    setSelectedRequests(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    
<>
        {/* Leave & Attendance Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          {/* Mark Attendance Section */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Mark attendance for today (21 September, 2024)</h2>
                <p className="text-sm text-gray-400">You can mark your attendance for today. For any other day, please use the edit option below.</p>
              </div>
              <div className="space-x-4">
                <button
                  className={`px-4 py-2 rounded ${isCheckedIn ? 'bg-gray-700 text-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                  onClick={() => setIsCheckedIn(true)}
                  disabled={isCheckedIn}
                >
                  Check In
                </button>
                <button
                  className={`px-4 py-2 rounded ${!isCheckedIn ? 'bg-gray-700 text-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                  onClick={() => setIsCheckedIn(false)}
                  disabled={!isCheckedIn}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <button className="text-gray-400 hover:text-white">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous month</span>
              </button>
              <div className="flex space-x-2">
                <span className="bg-gray-700 px-3 py-1 rounded">{currentMonth}</span>
                <span className="bg-gray-700 px-3 py-1 rounded">{currentYear}</span>
              </div>
              <button className="text-gray-400 hover:text-white">
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next month</span>
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-400">
                  {day}
                </div>
              ))}
              {calendarDays.map(({ day, status }) => (
                <div
                  key={day}
                  className={`text-center p-2 rounded ${
                    status === 'inactive' ? 'text-gray-600' :
                    status === 'present' ? 'text-green-500' :
                    status === 'holiday' ? 'bg-yellow-900 text-yellow-200' :
                    status === 'today' ? 'border border-white' :
                    'text-gray-400'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Open Requests */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Open Requests</h2>
            <div className="space-y-2">
              {openRequests.map(request => (
                <div key={request.id} className="flex items-start space-x-2 p-2 bg-gray-700 rounded">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={selectedRequests.includes(request.id)}
                    onChange={() => toggleRequestSelection(request.id)}
                  />
                  <p className="text-sm whitespace-pre-line">{request.content}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Delete Requests
            </button>
          </div>

          {/* Attendance */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Attendance</h2>
            <p className="text-sm text-gray-400 mb-4">
              To apply for leaves, or to update your attendance data, please click on the edit button next to a date. To apply for many leaves together, please click <a href="#" className="text-blue-400 hover:underline">here</a>.
            </p>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Check In</th>
                  <th className="p-2">Check Out</th>
                  <th className="p-2">Duration</th>
                  <th className="p-2">Remarks</th>
                  <th className="p-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((row, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="p-2">{row.date}</td>
                    <td className="p-2">{row.status}</td>
                    <td className="p-2">{row.checkIn}</td>
                    <td className="p-2">{row.checkOut}</td>
                    <td className="p-2">{row.duration}</td>
                    <td className="p-2">{row.remarks}</td>
                    <td className="p-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        </>
  )
}

