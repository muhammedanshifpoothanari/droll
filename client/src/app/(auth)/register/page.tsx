'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Define the Zod schema for form validation
const companyNameSchema = z.object({
  orgName: z.string().min(2, 'Company Name must be at least 2 characters'),
});

// Infer the form data type from the schema
type CompanyFormData = z.infer<typeof companyNameSchema>;

export default function CompanyNamePage() {
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  // Initialize React Hook Form with Zod resolver and default values
  const methods = useForm<CompanyFormData>({
    resolver: zodResolver(companyNameSchema),
    defaultValues: {
      orgName: '',
    },
  });

  const { handleSubmit, reset, formState: { isSubmitSuccessful, errors } } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // Handle form submission
  const onSubmitHandler = async (values: CompanyFormData) => {
    setLoading(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmissionSuccess(true);
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
        <CardHeader>
          <CardTitle className="text-2xl text-gray-300 font-bold">Enter Your Company Name</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            {/* Company Name */}
            <div className="grid grid-cols-1">
              <Label htmlFor="orgName" className='text-gray-300 mb-2'>Company Name *</Label>
              <Input
                id="orgName"
                placeholder="Enter your company name"
                className="bg-gray-700 border-gray-600"
                {...methods.register('orgName')}
              />
              {errors.orgName && (
                <p className="text-red-400 text-sm mt-1">{errors.orgName.message}</p>
              )}
            </div>

            {/* Submission Feedback */}
            {submissionError && (
              <p className="text-red-400 text-sm text-center">{submissionError}</p>
            )}
            {submissionSuccess && (
              <p className="text-green-400 text-sm text-center">
                Company name submitted successfully!
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
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
