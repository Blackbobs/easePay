"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  BookUser,
  ChevronDown,
  CreditCard,
  Mail,
  Shield,
  TicketCheck,
  User,
} from "lucide-react";

interface FormValues {
  fullName: string;
  matricNumber: string;
  email: string;
  dues: string[];
}

const hostelAmount = 25000;
const departmentAmount = 5000;

const duesList = [
  { label: "Hostel Dues", value: "hostel", amount: hostelAmount },
  { label: "Department Dues", value: "department", amount: departmentAmount },
];

const Page = () => {
  const [step, setStep] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      matricNumber: "",
      email: "",
      dues: [],
    },
  });

  const selectedDues = watch("dues") || [];
  const getTotalAmount = () => {
    return selectedDues.reduce((total, item) => {
      if (item === "hostel") total += hostelAmount;
      if (item === "department") total += departmentAmount;
      return total;
    }, 0);
  };

  const onSubmit = (data: FormValues) => {
    if (step === 1) {
      setStep(2);
    } else {
      // Final step: process payment
      const payload = {
        ...data,
        total: getTotalAmount(),
        paymentMethod: selectedPaymentMethod,
      };
      console.log("🚀 Payment Payload:", payload);
      alert("✅ Payment processed! (mock)");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-xl font-bold text-gray-800">easePay Payment</h1>
        <p className="text-gray-500 text-xs">
          Secure your dues in just a few clicks
        </p>
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-4">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            1
          </div>
          <div
            className={`h-1 w-16 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}
          ></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step === 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2 px-4 max-w-[230px] mx-auto">
          <span>Student Details</span>
          <span>Payment</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 ? (
          <div className="space-y-6 bg-white p-6 shadow-lg rounded-xl">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <div className="w-full border border-gray-300 rounded-full bg-gray-100 p-3 flex items-center gap-2">
                <User size={20} color="#555" />
                <input
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  className="focus:outline-none w-full"
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Matric Number
              </label>
              <div className="w-full border border-gray-300 rounded-full bg-gray-100 p-3 flex items-center gap-2">
                <BookUser size={20} color="#555" />
                <input
                  {...register("matricNumber", {
                    required: "Matric number is required",
                  })}
                  className="focus:outline-none w-full"
                  placeholder="20202928"
                />
              </div>
              {errors.matricNumber && (
                <p className="text-sm text-red-500">
                  {errors.matricNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <div className="w-full border border-gray-300 rounded-full bg-gray-100 p-3 flex items-center gap-2">
                <Mail size={20} color="#555" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email",
                    },
                  })}
                  type="email"
                  className="focus:outline-none w-full"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Select Dues
              </label>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-full flex items-center justify-between border border-gray-300 rounded-full p-3 text-left cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <TicketCheck size={20} color="#555" />
                  <span>
                    {selectedDues.length > 0
                      ? selectedDues
                          .map(
                            (val) =>
                              duesList.find((d) => d.value === val)?.label
                          )
                          .join(", ")
                      : "Choose dues to pay"}
                  </span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown with Tailwind-based height animation */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  dropdownOpen ? "max-h-40 mt-2" : "max-h-0"
                }`}
              >
                <div className="w-full bg-gray-100 border border-gray-600 rounded shadow-lg p-2 space-y-2">
                  {duesList.map((due) => (
                    <label
                      key={due.value}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        value={due.value}
                        {...register("dues")}
                        className="accent-secondary"
                      />
                      <span>
                        {due.label} - ₦{due.amount.toLocaleString()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {selectedDues.length > 0 && (
              <div className="bg-gray-100 p-4 rounded border border-secondary/30 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-secondary">
                    Total Amount:
                  </span>
                  <span className="text-lg font-bold text-secondary">
                    ₦{getTotalAmount().toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-full cursor-pointer"
              disabled={selectedDues.length === 0}
            >
              Continue to Payment
            </button>
          </div>
        ) : (
          <div className="space-y-6 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Payment Summary
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Full Name:</span>
                <span className="font-medium">{getValues("fullName")}</span>
              </div>
              <div className="flex justify-between">
                <span>Matric Number:</span>
                <span className="font-medium">{getValues("matricNumber")}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="font-medium">{getValues("email")}</span>
              </div>
              <hr className="my-2" />
              {getValues("dues")?.includes("hostel") && (
                <div className="flex justify-between">
                  <span>Hostel Dues:</span>
                  <span>₦{hostelAmount.toLocaleString()}</span>
                </div>
              )}
              {getValues("dues")?.includes("department") && (
                <div className="flex justify-between">
                  <span>Department Dues:</span>
                  <span>₦{departmentAmount.toLocaleString()}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold text-secondary">
                <span>Total:</span>
                <span>₦{getTotalAmount().toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                Choose Payment Method
              </h3>
              <div className="grid gap-3">
                {[
                  {
                    key: "card",
                    icon: <CreditCard className="w-5 h-5" />,
                    title: "Card Payment",
                    description: "Pay with debit/credit card",
                  },
                  {
                    key: "bank",
                    icon: <Shield className="w-5 h-5" />,
                    title: "Bank Transfer",
                    description: "Transfer directly from your bank app",
                  },
                  {
                    key: "ussd",
                    icon: <Mail className="w-5 h-5" />,
                    title: "USSD",
                    description: "Pay via your mobile phone code",
                  },
                ].map((method) => (
                  <button
                    key={method.key}
                    type="button"
                    onClick={() => setSelectedPaymentMethod(method.key)}
                    className={`flex items-center space-x-3 p-4 border rounded-lg transition-all ${
                      selectedPaymentMethod === method.key
                        ? "bg-secondary/10 border-secondary text-secondary"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {method.icon}
                    <div className="text-left">
                      <div
                        className={`font-medium ${
                          selectedPaymentMethod === method.key
                            ? "text-secondary"
                            : ""
                        }`}
                      >
                        {method.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {method.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 py-2 rounded-full text-gray-700"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!selectedPaymentMethod}
                className={`flex-1 py-2 rounded-full text-white ${
                  selectedPaymentMethod
                    ? "bg-primary"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Pay Now
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Page;
