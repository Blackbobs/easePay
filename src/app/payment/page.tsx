"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  BookUser,
  Mail,
  Upload,
  User,
  GraduationCap,
  Building2,
  Landmark,
  Wallet,
  Phone,
  FileSpreadsheet,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast"; 

interface FormValues {
  fullName: string;
  matricNumber: string;
  email: string;
  phoneNumber: string;
  college: string;
  department: string;
  amount: number;
  bank: string;
  proofUrl: string;
  dueType: string;
}

enum College {
  COLAMRUD = "COLAMRUD",
  COLANIM = "COLANIM",
  COLBIOS = "COLBIOS",
  COLENDS = "COLENDS",
  COLPHYS = "COLPHYS",
  COLVET = "COLVET",
}

enum Department {
  CHM = "CHM",
  CSC = "CSC",
  MTS = "MTS",
  PHS = "PHS",
  STS = "STS"
}

const Page = () => {
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [proofUploaded, setProofUploaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      matricNumber: "",
      email: "",
      phoneNumber: "",
      college: "",
      department: "",
      amount: 0,
      bank: "",
      proofUrl: "",
      dueType: "",
    },
  });

  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // 1️⃣ Get signature + config from your backend
      const { data: config } = await axios.get(
        "https://easypay-backend-z1yc.onrender.com/api/v1/cloudinary/upload",
        { params: { folder: "payment_proof" } }
      );

      const { apiKey, cloudName, signature, timestamp, folder } = config;

      // 2️⃣ Build the form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      if (folder) formData.append("folder", folder);

      
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (uploadRes.data.secure_url) {
        setValue("proofUrl", uploadRes.data.secure_url, {
          shouldValidate: true,
        });
        setProofUploaded(true);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (step === 1) {
      setStep(2);
    } else {
      setSubmitting(true);
      try {
        const res = await axios.post(
          "https://easypay-backend-z1yc.onrender.com/api/v1/transactions",
          data
        );
        toast.success("Payment submitted successfully 🎉");
        console.log("🚀 Transaction Saved:", res.data);
        reset(); 
        setStep(1);
        setProofUploaded(false);
      } catch (err) {
        toast.error("Submission failed. Please try again.");
        console.error("❌ Transaction Failed:", err);
      }finally {
        setSubmitting(false); 
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-xl font-bold text-gray-800">easePay Payment</h1>
        <p className="text-gray-500 text-xs">
          Submit your proof of payment & details in two easy steps
        </p>
      </div>

      {/* Step indicator */}
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
          <span>Proof Upload</span>
          <span>Student Details</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 ? (
          /* STEP 1: Proof Upload */
          <div className="space-y-6 bg-white p-6 shadow-lg rounded-xl">
            {/* Account details */}
            <div className="bg-gray-100 p-4 rounded border border-gray-300">
              <h2 className="font-semibold text-gray-800 mb-2">
                Payment Account Details
              </h2>
              <p className="text-sm text-gray-700">
                Please make your payment to the following account:
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>Account Name:</strong> EASY PAY INNOVATIONS HUBS || Surprise quyum <br />
                <strong>Bank:</strong> Moniepoint <br />
                <strong>Account Number:</strong> 8068913471
              </p>
              <small className="text-sm text-gray-700 mt-2">Please add charges of #200</small>
            </div>

            {/* Upload proof */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Proof of Payment
              </label>
              <div className="border border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer bg-gray-50">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  id="proofUpload"
                  onChange={handleFileUpload}
                />

                <label
                  htmlFor="proofUpload"
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <Upload size={28} className="text-gray-500" />
                  {uploading ? (
                    <span className="text-sm text-gray-600">Uploading...</span>
                  ) : proofUploaded ? (
                    <span className="text-sm text-green-600">
                      ✅ Proof uploaded successfully
                    </span>
                  ) : (
                    <span className="text-sm text-gray-600">
                      Click to upload receipt (JPG, PNG, PDF)
                    </span>
                  )}
                </label>
              </div>
              {errors.proofUrl && (
                <p className="text-sm text-red-500">
                  {errors.proofUrl.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!proofUploaded || uploading}
              className={`w-full py-3 rounded-full text-white ${
                proofUploaded ? "bg-primary" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        ) : (
          /* STEP 2: Student Details */
          <div className="space-y-6 bg-white p-6 shadow-lg rounded-xl">
            {/* Full Name */}
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

            {/* Matric Number */}
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

            {/* Email */}
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

            {/* ✅ Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <div className="w-full border border-gray-300 rounded-full bg-gray-100 p-3 flex items-center gap-2">
                <Phone size={20} color="#555" />
                <input
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                  type="tel"
                  className="focus:outline-none w-full"
                  placeholder="08012345678"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
  <label className="block text-sm font-medium mb-1">College</label>
  <div className="w-full border border-gray-300 rounded-full bg-gray-100 px-3 flex items-center">
    <GraduationCap size={20} color="#555" />
    <select
      {...register("college", { required: "College is required" })}
      className="focus:outline-none w-full bg-gray-100 p-3 rounded-full"
      defaultValue=""
    >
      <option value="" disabled>
        Select College
      </option>
      {Object.values(College).map((college) => (
        <option key={college} value={college}>
          {college}
        </option>
      ))}
    </select>
  </div>
  {errors.college && (
    <p className="text-sm text-red-500">{errors.college.message}</p>
  )}
</div>

{/* Department */}
<div>
  <label className="block text-sm font-medium mb-1">Department</label>
  <div className="w-full border border-gray-300 rounded-full bg-gray-100 px-3 flex items-center">
    <Building2 size={20} color="#555" />
    <select
      {...register("department", { required: "Department is required" })}
      className="focus:outline-none w-full bg-gray-100 p-3 rounded-full"
      defaultValue=""
    >
      <option value="" disabled>
        Select Department
      </option>
      {Object.values(Department).map((dept) => (
        <option key={dept} value={dept}>
          {dept}
        </option>
      ))}
    </select>
  </div>
  {errors.department && (
    <p className="text-sm text-red-500">{errors.department.message}</p>
  )}
</div>
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <div className="w-full border border-gray-300 rounded-full bg-gray-100 p-3 flex items-center gap-2">
                <Wallet size={20} color="#555" />
                <input
                  {...register("amount", { required: "Amount is required" })}
                  type="number"
                  className="focus:outline-none w-full"
                  placeholder="25000"
                />
              </div>
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>

            {/* Bank */}
            <div>
              <label className="block text-sm font-medium mb-1">Bank</label>
              <div className="w-full border border-gray-300 rounded-full bg-gray-100 p-3 flex items-center gap-2">
                <Landmark size={20} color="#555" />
                <input
                  {...register("bank", { required: "Bank name is required" })}
                  className="focus:outline-none w-full"
                  placeholder="First Bank of Nigeria"
                />
              </div>
              {errors.bank && (
                <p className="text-sm text-red-500">{errors.bank.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Due Type
              </label>
              <div className="w-full border border-gray-300 rounded-full bg-gray-100 px-3 flex items-center">
                <FileSpreadsheet size={20} color="#555" />
                <select
                  {...register("dueType", { required: "Due type is required" })}
                  className="focus:outline-none w-full bg-gray-100 p-3 rounded-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Due Type
                  </option>
                  <option value="college">College</option>
                  <option value="department">Department</option>
                  <option value="hostel">Hostel</option>
                  <option value="sug">SUG</option>
                </select>
              </div>
              {errors.dueType && (
                <p className="text-sm text-red-500">{errors.dueType.message}</p>
              )}
            </div>

            {/* Actions */}
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
                disabled={!isValid || submitting}
                className={`flex-1 py-2 rounded-full text-white ${
                  isValid && !submitting
                    ? "bg-primary cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Page;
