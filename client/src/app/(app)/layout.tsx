// src/components/Layout.tsx
'use client';

import React, { useEffect } from 'react';
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
console.log(ethereumAddress);

  useEffect(() => {
    // If ethereumAddress is not present, redirect to /login
    if (!ethereumAddress) {
      router.push('/login');
    }
  }, [ethereumAddress, router]);

  // If ethereumAddress is not present, do not render children
  // This prevents flashing of protected content before redirection


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
