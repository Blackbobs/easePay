"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { CreditCard, Search, Download, Mail, CheckCircle, AlertCircle, BookUser, PhoneCall } from "lucide-react";

interface Payment {
  id: string;
  type: string;
  amount: number;
  status: string;
  date: string;
  time: string;
  receiptUrl: string;
};

interface StudentPaymentRecord {
  name: string;
  email: string;
  payments: Payment[];
};


// Mock data for demonstration
const mockPaymentHistory: Record<string, StudentPaymentRecord> = {
  "20/1234": {
    email: "adebayo.johnson@student.edu",
    name: "Adebayo Johnson",
    payments: [
      {
        id: "TXN001",
        type: "Hostel + Department",
        amount: 30000,
        status: "Success",
        date: "2024-01-15",
        time: "14:30",
        receiptUrl: "#",
      },
    ],
  },
  "20/5678": {
    email: "fatima.ahmed@student.edu",
    name: "Fatima Ahmed",
    payments: [
      {
        id: "TXN002",
        type: "Hostel",
        amount: 25000,
        status: "Success",
        date: "2024-01-15",
        time: "12:15",
        receiptUrl: "#",
      },
      {
        id: "TXN003",
        type: "Department",
        amount: 5000,
        status: "Success",
        date: "2024-02-01",
        time: "09:45",
        receiptUrl: "#",
      },
    ],
  },
  "20/9999": {
    email: "new.student@student.edu",
    name: "New Student",
    payments: [],
  },
};

type FormData = {
  matricNumber: string;
  email: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>();
  const [searchResult, setSearchResult] = useState<StudentPaymentRecord | null>(null);
  const [error, setError] = useState("");

  const onSubmit = async (data: FormData) => {
    setError("");
    setSearchResult(null);

    // Simulate API call
    setTimeout(() => {
      const studentData = mockPaymentHistory[data.matricNumber as keyof typeof mockPaymentHistory];

      if (!studentData) {
        setError("No records found for this matric number. Please check and try again.");
      } else if (studentData.email.toLowerCase() !== data.email.toLowerCase()) {
        setError("Email address doesn't match our records. Please check and try again.");
      } else {
        setSearchResult(studentData);
      }
    }, 500);
  };



  return (
    <div className="bg-gray-50">


      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
   

        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="text-center my-5">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Check Your Payment History</h1>
          <p className="text-xs text-gray-600">Enter your details to view your payment receipts</p>
        </div>
            <div className="p-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label htmlFor="matricNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Matric Number
                  </label>
                  <div className="w-full border border-gray-300 rounded-full bg-gray-100 p-3 flex items-center gap-2">
                  <BookUser size={20} color="#555" />
                  <input
                    id="matricNumber"
                    type="text"
                    {...register("matricNumber", { required: "Matric number is required" })}
                    className="focus:outline-none w-full"
                    placeholder="e.g., 20/1234"
                    />
                    </div>
                  {errors.matricNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.matricNumber.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="w-full border border-gray-300 rounded-full bg-gray-100 p-3 flex items-center gap-2">
                  <Mail size={20} color="#555" />
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email",
                    },
                })}
                     className="focus:outline-none w-full"
                    placeholder="your.email@example.com"
                    />
                    </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                  <p className="mt-1 text-xs font-medium text-gray-500">Enter the email address you used for payments</p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center p-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Searching...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Search className="w-4 h-4 mr-2" />
                      Search Records
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchResult && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="flex items-center text-lg font-bold">
                Payment History for {searchResult.name} ({watch("matricNumber")})
              </h2>
            </div>
            <div className="p-4">
              {searchResult.payments.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History Found</h3>
                  <p className="text-gray-600 mb-4">You haven&apos;t made any payments yet.</p>
                  <Link href="/payment">
                    <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Make Your First Payment
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {searchResult.payments.map((payment: Payment) => (
                    <div
                      key={payment.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-gray-900">{payment.type}</div>
                            <div className="text-xs text-gray-600">
                              {payment.date} at {payment.time}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm text-gray-900">₦{payment.amount.toLocaleString()}</div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {payment.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-xs text-gray-600">Transaction ID: {payment.id}</span>
                        <div className="flex space-x-2">
                    
                          <button className="inline-flex items-center p-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-secondary bg-white hover:bg-gray-50 focus:outline-none">
                            <Download className="w-4 h-4 mr-1" />
                            Download Receipt
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8">
          <div className="bg-gray-100 rounded-xl overflow-hidden">
            <div className="p-6 text-center">
              <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Can&apos;t find your payment records or having trouble with receipts?
              </p>
              <div className="flex flex-row gap-2 justify-center">
                <button className="inline-flex items-center p-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </button>
                <button className="inline-flex items-center py-3 px-5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                <PhoneCall className="w-4 h-4 mr-2" />
                  WhatsApp Help
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}