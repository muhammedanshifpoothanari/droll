// 'use client'

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query"; 
// import Sidebar from "@/components/layout/Sidebar";
// import Navbar from "./_components/navbar/Navbar";
// import { AuthService } from "@/services/api/auth-service";
// import Spinner from "@/components/animated/Spinner";
// import { useLoading } from '@/context/LoadingContext'; // Import loading context

// // Function to fetch user authentication status
// const fetchAuthStatus = async () => {
//     const service = new AuthService();
//     const response = await service.isUserActive();
//     return response; // Should return an object like { isAuthenticated: true/false }
// };

// export default function Layout({ children }: { children: React.ReactNode }) {
//     const router = useRouter();
//     const { isLoading: contextLoading, setLoading } = useLoading(); // Rename `isLoadingOne` to `contextLoading`
//     const [authStatus, setAuthStatus] = useState<boolean>(false)
    
    
    

//     // Redirect to login if not authenticated
//     useEffect(() => {
//         if (!isLoading && !authStatus) {
//             router.push("/login");
//         }
//     }, [isLoading, authStatus, router]);

//     // Block rendering until the authentication status is determined
//     if (isLoading || !authStatus) {
//         return <Spinner />; // Display loading state while checking auth
//     }

//     if (isError) {
//         return <div>Error fetching authentication status</div>;
//     }

//     // Render protected content only if authenticated
//     return (
//         <>
//             <Navbar />
//             <div className="flex h-screen bg-gray-900 text-gray-100">
//                 <Sidebar />
//                 {contextLoading ? <Spinner /> : children} {/* Display spinner based on context loading */}
//             </div>
//         </>
//     );
// }

import Navbar from '@/components/layout/Navbar'
import RightSideBar from '@/components/layout/RightSideBar'
import Sidebar from '@/components/layout/Sidebar'
 import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
     <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Navbar />
    {children} </div>

{/* Right Sidebar */}
<RightSideBar />
</div>
  )
}

export default Layout
