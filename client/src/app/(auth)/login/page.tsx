'use client';

import { motion } from 'framer-motion';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Web3 from 'web3';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Define the Zod schema for form validation
const signupSchema = z.object({
  fullName: z.string().min(2, 'Full Name must be at least 2 characters'),
});

// Infer the form data type from the schema
type SignupFormData = z.infer<typeof signupSchema>;

// Replace with your actual contract's ABI
const contractABI = [
  // Example ABI entries
  {
    "constant": true,
    "inputs": [
      {
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "isUserRegistered",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "fullName",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Replace with your actual contract address
const contractAddress = '0xYourSmartContractAddressHere';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [metaMaskLoading, setMetaMaskLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isUserExisting, setIsUserExisting] = useState<boolean | null>(null);
  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(null);
  const [contractInstance, setContractInstance] = useState<any>(null);

  // Initialize React Hook Form with Zod resolver and default values
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      // Optionally, you can perform additional actions here, such as redirecting the user
    }
  }, [isSubmitSuccessful, reset]);

  // Handle MetaMask Connection and User Existence Check
  const connectMetaMask = async () => {
    setMetaMaskLoading(true);
    setSubmissionError(null);
    console.log("sdsdsdsds");
    
    try {
      if (!(window as any).ethereum) {
        setSubmissionError('MetaMask is not installed. Please install it to proceed.');
        setMetaMaskLoading(false);
        return;
      } 

      // Initialize Web3
      const web3 = new Web3((window as any).ethereum);
      setWeb3Instance(web3);
console.log(web3); 
 
      // Request account access if needed
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

      // Get accounts
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setSubmissionError('No accounts found. Please ensure MetaMask is unlocked.');
        setMetaMaskLoading(false);
        console.log('dsds');
        
        return;
      } 
      

      const account = accounts[0];
      setWalletAddress(account);

      // Initialize contract instance
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      setContractInstance(contract);
      console.log("haaaaanccooodd digitalll");
      // Check if user is registered
      const userExists = await contract.methods.isUserRegistered(account).call();
      console.log("-------",userExists,walletAddress);
      
      setIsUserExisting(userExists);
    } catch (error: any) {
      setSubmissionError(error.message || 'An error occurred during MetaMask connection.');
    } finally {
      setMetaMaskLoading(false);
    }
  };

  // Handle form submission for registering a new user
  const onSubmitHandler: SubmitHandler<SignupFormData> = async (values) => {
    if (!walletAddress || !web3Instance || !contractInstance) {
      setSubmissionError('Wallet address is missing. Please reconnect MetaMask.');
      return;
    }

    setLoading(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    try {
      // Send transaction to register user
      await contractInstance.methods.registerUser(values.fullName).send({ from: walletAddress });

      setSubmissionSuccess(true);
      setIsUserExisting(true);
      // Optionally, redirect the user after successful registration
    } catch (error: any) {
      // Handle specific error messages (e.g., user rejected transaction)
      if (error.code === 4001) {
        setSubmissionError('Transaction rejected by the user.');
      } else {
        setSubmissionError(error.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-900 text-gray-300 p-4 flex items-center justify-center"
    >
      <Card className="w-full max-w-md border-0 p-0 bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-300 font-bold">Set Up Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          {/* MetaMask Connection Section */}
          {!walletAddress && (
            <div className="space-y-4">
              <Button
                onClick={connectMetaMask}
                className="w-full flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600"
                disabled={metaMaskLoading}
              >
                {metaMaskLoading ? 'Connecting...' : 'Connect with MetaMask'}
              </Button>

              {/* Submission Feedback */}
              {submissionError && (
                <p className="text-red-400 text-sm text-center">{submissionError}</p>
              )}
            </div>
          )}

          {/* Existing User Message */}
          {walletAddress && isUserExisting === true && (
            <div className="text-center">
              <p className="text-green-400 text-sm">
                Welcome back! You are successfully logged in.
              </p>
              {/* Optionally, add a redirect button or further actions */}
              <Button
                className="mt-4 w-full px-6"
                onClick={() => {
                  // Redirect to dashboard or desired page
                  window.location.href = '/dashboard';
                }}
              >
                Go to Dashboard
              </Button>
            </div>
          )}

          {/* New User Form */}
          {walletAddress && isUserExisting === false && (
            <FormProvider {...methods}>
              <form
                className="space-y-4"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmitHandler)}
              >
                {/* Full Name */}
                <div className="grid grid-cols-1">
                  <Label htmlFor="fullName" className="text-gray-300 mb-2">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    className="bg-gray-700 border-gray-600"
                    {...methods.register('fullName')}
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Submission Feedback */}
                {submissionError && (
                  <p className="text-red-400 text-sm text-center">{submissionError}</p>
                )}
                {submissionSuccess && (
                  <p className="text-green-400 text-sm text-center">
                    Account created successfully! Please proceed to create a business profile.
                  </p>
                )}

                {/* Submit and Reset Buttons */}
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    className="px-6 text-gray-400 border-gray-400"
                    variant="outline"
                    onClick={() => reset()}
                  >
                    Reset
                  </Button>
                  <Button type="submit" className="px-6" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>
              </form>
            </FormProvider>
          )}

          {/* Additional Links */}
          <div className="mt-4 text-center text-gray-400">
            <p>
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 text-sm hover:underline">
                Login
              </Link>
            </p>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-center mt-4 text-gray-400">
            This site is protected by reCAPTCHA and the Google{' '}
            <Link href="/privacy" className="text-blue-400 hover:underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="text-blue-400 hover:underline">
              Terms of Service
            </Link>{' '}
            apply.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
