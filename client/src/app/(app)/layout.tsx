'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For Next.js 13+ app directory
import { useSelector } from 'react-redux';
import { selectEthereumAddress } from '@/redux/features/authSlice';
import { RootState } from '@/redux/store';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import Spinner from '@/components/animated/Spinner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const ethereumAddress = useSelector((state: RootState) => selectEthereumAddress(state));
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!ethereumAddress) {
      router.push('/login');
    } else {
      setIsCheckingAuth(false); // Once the state is available, stop checking
    }
  }, [ethereumAddress, router]);

  // Show spinner while waiting for authentication check
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
