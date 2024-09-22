// src/components/Layout.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For Next.js 13+ app directory
import { useDispatch, useSelector } from 'react-redux';
import { selectEthereumAddress } from '@/redux/features/authSlice';
import { AppDispatch, RootState } from '@/redux/store';
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
    if (ethereumAddress) {
        console.log("why this is");
        
      router.push('/dashboard');
    }
  }, [ethereumAddress, router]);
  console.log("why this is not");

  // If ethereumAddress is not present, do not render children
  // This prevents flashing of protected content before redirection
   console.log(ethereumAddress);

  return (
    <>
       
          {children}
       
    </>
  );
};

export default Layout;
