'use client';

import { motion } from 'framer-motion';
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

// Define the Zod schema for form validation
const signupSchema = z.object({
  fullName: z.string().min(2, 'Full Name must be at least 2 characters'),
  orgName: z.string().min(2, 'Organization Name must be at least 2 characters'),
  workEmail: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, 'Phone Number must be exactly 10 digits'),
  employees: z.string().nonempty('Please select the number of employees'),
  title: z.string().nonempty('Please select your title'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
  whatsapp: z.boolean().optional(),
});

// Infer the form data type from the schema
type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  // Initialize React Hook Form with Zod resolver and default values
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      orgName: '',
      workEmail: '',
      phoneNumber: '',
      employees: '',
      title: '',
      terms: false,
      whatsapp: false,
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      // Optionally, you can perform additional actions here, such as redirecting the user
    }
  }, [isSubmitSuccessful, reset]);

  // Handle form submission
  const onSubmitHandler: SubmitHandler<SignupFormData> = async (values) => {
    setLoading(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    try {
      // Replace the below API call with your actual signup logic
      // Example:
      // await api.signup(values);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmissionSuccess(true);
      // Optionally, redirect the user after successful signup
    } catch (error) {
      setSubmissionError('An unexpected error occurred. Please try again.');
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
        <CardHeader className="">
          <CardTitle className="text-2xl text-gray-300 font-bold">Set Up Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form
              className="space-y-4"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              {/* Full Name */}
              <div className="grid grid-cols-1">
                <Label htmlFor="fullName" className='text-gray-300 mb-2'>Full Name *</Label>
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

              {/* Organization Name */}
              <div className="grid grid-cols-1">
                <Label htmlFor="orgName" className='text-gray-300 mb-2'>Organization Name *</Label>
                <Input
                  id="orgName"
                  placeholder="Enter your organization name"
                  className="bg-gray-700 border-gray-600"
                  {...methods.register('orgName')}
                />
                {errors.orgName && (
                  <p className="text-red-400 text-sm mt-1">{errors.orgName.message}</p>
                )}
              </div>

              {/* Work Email Address */}
              <div className="grid grid-cols-1">
                <Label htmlFor="workEmail" className='text-gray-300 mb-2'>Work Email Address *</Label>
                <Input
                  id="workEmail"
                  type="email"
                  placeholder="Enter your work email address"
                  className="bg-gray-700 border-gray-600"
                  {...methods.register('workEmail')}
                />
                {errors.workEmail && (
                  <p className="text-red-400 text-sm mt-1">{errors.workEmail.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="grid grid-cols-1">
                <Label htmlFor="phoneNumber" className='text-gray-300 mb-2'>Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  placeholder="eg. 9810012345"
                  className="bg-gray-700 border-gray-600"
                  {...methods.register('phoneNumber')}
                />
                {errors.phoneNumber && (
                  <p className="text-red-400 text-sm mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Number of Employees */}
              <div className="grid grid-cols-1">
                <Label htmlFor="employees" className='text-gray-300 mb-2'>Number of Employees *</Label>
                <Controller
                  name="employees"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select number of employees" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10</SelectItem>
                        <SelectItem value="11-50">11-50</SelectItem>
                        <SelectItem value="51-200">51-200</SelectItem>
                        <SelectItem value="201-500">201-500</SelectItem>
                        <SelectItem value="501+">501+</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.employees && (
                  <p className="text-red-400 text-sm mt-1">{errors.employees.message}</p>
                )}
              </div>

              {/* Your Title */}
              <div className="grid grid-cols-1">
                <Label htmlFor="title" className='text-gray-300 mb-2'>Your Title *</Label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select your title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Founder">Founder</SelectItem>
                        <SelectItem value="CEO">CEO</SelectItem>
                        <SelectItem value="CTO">CTO</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Employee">Employee</SelectItem>
                        {/* Add more options as needed */}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

             
             
              {/* Submission Feedback */}
              {submissionError && (
                <p className="text-red-400 text-sm text-center">{submissionError}</p>
              )}
              {submissionSuccess && (
                <p className="text-green-400 text-sm text-center">
                  Account created successfully!
                </p>
              )}

              {/* Submit and Cancel Buttons */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  className="px-6 text-gray-400 border-gray-400"
                  variant="outline"
                  
                  onClick={() => reset()}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  className="px-6"
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </Button>
              </div>
            </form>
          </FormProvider>

          {/* Additional Links */}
          <div className="mt-4 text-center text-gray-400 space-y-1">
            <p>
              Already have an account with us?{' '}
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
