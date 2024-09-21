 
export default function Component() {
  return (
    <>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Reminders */}
            <div className="col-span-2 bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Reminders</h2>
              <p>Please consider <a href="#" className="text-blue-400 hover:underline">uploading a photo</a> of yourself.</p>
            </div>

            {/* Quick links */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Quick links</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-400 hover:underline">View personal transactions</a></li>
                <li><a href="#" className="text-blue-400 hover:underline">Employee directory</a></li>
              </ul>
            </div>

            {/* Welcome Message */}
            <div className="col-span-3 bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold">Welcome</h2>
              <p className="text-2xl font-bold">Anshad KT <span className="text-gray-400 text-sm">(109)</span></p>
              <p className="text-gray-400">Jr. Full Stack Developer, Development</p>
            </div>
          </div>
        </main>
        </>
  )
}

 