"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  BookUser,
  Mail,
  Upload,
  User,
  GraduationCap,
  Phone,
  FileSpreadsheet,
  DoorClosed,
  CreditCard,
  School,
  CheckCircle2,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import axiosConfig from "@/utils/axios-config";

interface FormValues {
  fullName: string;
  matricNumber: string;
  email: string;
  phoneNumber: string;
  college: string;
  department: string;
  proofUrl: string;
  dueType: string;
  hostel: string;
  amount: string;
  studentType: string;
  level: string;
}

enum College {
  COLAMRUD = "COLAMRUD",
  COLANIM = "COLANIM",
  COLBIOS = "COLBIOS",
  COLENG = "COLENG",
  COLERM = "COLERM",
  COLENDS = "COLENDS",
  COLPHYS = "COLPHYS",
  COLPLANT = "COLPLANT",
  COLFHEC = "COLFHEC",
  COLCOMP = "COLCOMP",
  COLVET = "COLVET",
  FUMMSA = "FUMMSA",
}

enum Hostel {
  IYAT = "IYAT",
  PRINCESS_SOBOYEJO_MARBLE = "Princess SOboyejo(MARBLE)",
  OLD_NEEDS = "OLD NEEDS",
  NEW_NEEDS = "NEW NEEDS",
  OTHERS = "OTHERS",
}

enum Department {
  AGAD = "AGAD",
  AEFM = "AEFM",
  ARED = "ARED",
  BCH = "BCH",
  MCB = "MCB",
  PAB = "PAB",
  PAZ = "PAZ",
  ABE = "ABE",
  CVE = "CVE",
  ELE = "ELE",
  MCE = "MCE",
  MTE = "MTE",
  AQFM = "AQFM",
  EMT = "EMT",
  FWM = "FWM",
  WMA = "WMA",
  FST = "FST",
  HSM = "HSM",
  HMT = "HMT",
  NTD = "NTD",
  ETS = "ETS",
  LIS = "LIS",
  CPT = "CPT",
  HRT = "HRT",
  PBST = "PBST",
  PPCP = "PPCP",
  SSLM = "SSLM",
  CSC = "CSC",
  SWE = "SWE",
  IFS = "IFS",
  CYS = "CYS",
  DTS = "DTS",
  IFT = "IFT",
  ICT = "ICT",
  CHM = "CHM",
  MTS = "MTS",
  PHY = "PHY",
  STS = "STS",
  VET = "VET",
  FUMSAA = "FUMSAA",
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
      proofUrl: "",
      dueType: "",
      hostel: "",
      amount: "",
      studentType: "",
      level: "",
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { data: config } = await axios.get(
        "https://easypay-backend-z1yc.onrender.com/api/v1/cloudinary/upload",
        { params: { folder: "payment_proof" } }
      );

      const { apiKey, cloudName, signature, timestamp, folder } = config;

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
        const res = await axiosConfig.post("/transactions", data);
        console.log(res.data)
        if (res.data) {
          const reference = res.data.data?.reference || "N/A";
          const emailHtml = `
            <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <div style="background: #4f46e5; color: #ffffff; padding: 16px; text-align: center;">
            <h2 style="margin: 0;">EasyPay</h2>
            <p style="margin: 0; font-size: 14px;">Payment Confirmation</p>
          </div>
          
          <!-- Body -->
          <div style="padding: 24px; color: #333333; line-height: 1.6;">
            <h3 style="margin-top: 0;">Hi ${res.data.data?.fullName || "User"},</h3>
            <p>We're happy to let you know that we've <b>received your payment</b>.</p>
            
            <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><b>Status:</b> ✅ Payment Received</p>
              // <p style="margin: 0;"><b>Reference:</b> ${reference}</p>
            </div>
    
            <p>Once confirmed, we'll send your official receipt. Please keep the reference for your records.</p>
    
            <!-- QR Code -->
            <div style="text-align: center; margin-top: 20px;">
              <p style="font-size: 14px; color: #555;">Scan this QR code to verify your transaction:</p>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${reference}" 
                   alt="QR Code for Payment Reference" style="margin-top: 10px;" />
            </div>
    
            <p style="margin-top: 24px;">Thanks for using <b>EasyPay</b> 🎉</p>
          </div>
          
          <!-- Footer -->
          <div style="background: #f3f4f6; padding: 12px; text-align: center; font-size: 12px; color: #666;">
            © ${String(new Date().getFullYear())} EasyPay. All rights reserved.
          </div>
        </div>
      </div>
          `;
        
          try {
            console.log("📨 Sending email to:", data.email);
            const mailRes = await fetch("/api/mailer", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                to: data.email,
                subject: "✅ Payment Received - EasyPay",
                html: emailHtml,
              }),
            });
        
            const mailData = await mailRes.json();
            console.log("📧 Mailer response:", mailData);
        
            if (!mailRes.ok || !mailData.success) {
              toast.error("Email could not be sent");
            } else {
              toast.success("Receipt email sent!");
            }
          } catch (err) {
            console.error("❌ Mailer call failed:", err);
            toast.error("Email sending failed");
          }
        }
        
        toast.success("Payment submitted successfully 🎉");
        console.log("🚀 Transaction Saved:", res.data);
        
        toast.success("Payment submitted successfully 🎉");
        console.log("🚀 Transaction Saved:", res.data);
        reset();
        setStep(1);
        setProofUploaded(false);
      } catch (err) {
        toast.error("Submission failed. Please try again.");
        console.error("❌ Transaction Failed:", err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">easePay Payment</h1>
          <p className="text-gray-600 text-sm">Submit your proof of payment & details in two easy steps</p>
        </div>

        {/* Step indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold text-sm transition-all duration-300 ${
                    step >= 1 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > 1 ? <CheckCircle2 size={20} /> : "1"}
                </div>
                <span
                  className={`text-xs font-medium transition-colors ${step >= 1 ? "text-indigo-600" : "text-gray-500"}`}
                >
                  Student Details
                </span>
              </div>

              {/* Connector */}
              <div
                className={`h-0.5 w-24 transition-all duration-500 ${step >= 2 ? "bg-indigo-600" : "bg-gray-300"}`}
              ></div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold text-sm transition-all duration-300 ${
                    step === 2 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  2
                </div>
                <span
                  className={`text-xs font-medium transition-colors ${
                    step === 2 ? "text-indigo-600" : "text-gray-500"
                  }`}
                >
                  Proof Upload
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 ? (
            /* STEP 1: Student Details */
            <div className="space-y-6 bg-white p-8 shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-100">
              {/* Account details */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
                <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CreditCard size={20} className="text-indigo-600" />
                  Payment Account Details
                </h2>
                <p className="text-sm text-gray-700 mb-4">Please make your payment to the following account:</p>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg space-y-1.5">
                  <p className="text-sm text-gray-800">
                    <strong className="text-gray-900">Account Name:</strong> EASY PAY INNOVATIONS HUBS
                  </p>
                  <p className="text-sm text-gray-800">
                    <strong className="text-gray-900">Bank:</strong> Moniepoint
                  </p>
                  <p className="text-sm text-gray-800">
                    <strong className="text-gray-900">Account Number:</strong> 6276821885
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-3">Processing Fee: ₦150</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">💰 Payment Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🎓 Freshers:</span>
                    <span className="font-semibold text-gray-900">₦4,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">📘 Stalites:</span>
                    <span className="font-semibold text-gray-900">₦3,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">⚡ Processing Fee:</span>
                    <span className="font-semibold text-gray-900">₦150</span>
                  </div>
                  <div className="h-px bg-purple-200 my-3"></div>
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-gray-900">Total (Freshers):</span>
                    <span className="text-indigo-600">₦4,150</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-gray-900">Total (Staylites):</span>
                    <span className="text-indigo-600">₦3,150</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-600 italic">
                  Kindly ensure you pay the correct amount with processing fee before uploading your proof of payment
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-gray-900"
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && <p className="text-sm text-red-500 mt-1.5">{errors.fullName.message}</p>}
              </div>

              {/* Matric Number */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Matric Number/UTME REG NO.</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <BookUser size={20} />
                  </div>
                  <input
                    {...register("matricNumber", {
                      required: "Matric number is required",
                    })}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-gray-900"
                    placeholder="20202928"
                  />
                </div>
                {errors.matricNumber && <p className="text-sm text-red-500 mt-1.5">{errors.matricNumber.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={20} />
                  </div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email",
                      },
                    })}
                    type="email"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-gray-900"
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500 mt-1.5">{errors.email.message}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone size={20} />
                  </div>
                  <input
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Enter a valid phone number",
                      },
                    })}
                    type="tel"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-gray-900"
                    placeholder="08012345678"
                  />
                </div>
                {errors.phoneNumber && <p className="text-sm text-red-500 mt-1.5">{errors.phoneNumber.message}</p>}
              </div>

              {/* College */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">College</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                    <GraduationCap size={20} />
                  </div>
                  <select
                    {...register("college", { required: "College is required" })}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-gray-900 appearance-none cursor-pointer"
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
                {errors.college && <p className="text-sm text-red-500 mt-1.5">{errors.college.message}</p>}
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Department</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                    <School size={20} />
                  </div>
                  <select
                    {...register("department", {
                      required: "Department is required",
                    })}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-gray-900 appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {Object.values(Department).map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.department && <p className="text-sm text-red-500 mt-1.5">{errors.department.message}</p>}
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Level</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                    <GraduationCap size={20} />
                  </div>
                  <select
                    {...register("level", {
                      required: "Level is required",
                    })}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-gray-900 appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Level
                    </option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="600">600</option>
                  </select>
                </div>
                {errors.level && <p className="text-sm text-red-500 mt-1.5">{errors.level.message}</p>}
              </div>

              {/* Student Type */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Student Type</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                    <User size={20} />
                  </div>
                  <select
                    {...register("studentType", {
                      required: "Student type is required",
                    })}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-gray-900 appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Student Type
                    </option>
                    <option value="fresher">Fresher</option>
                    <option value="staylite">Staylite</option>
                  </select>
                </div>
                {errors.studentType && <p className="text-sm text-red-500 mt-1.5">{errors.studentType.message}</p>}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Amount (₦)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                    <CreditCard size={20} />
                  </div>
                  <select
                    {...register("amount", { required: "Amount is required" })}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-gray-900 appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Amount
                    </option>
                    <option value="4000">₦4,000</option>
                    <option value="3000">₦3,000</option>
                  </select>
                </div>
                {errors.amount && <p className="text-sm text-red-500 mt-1.5">{errors.amount.message}</p>}
              </div>

              {/* Hostel */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Hostel</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                    <DoorClosed size={20} />
                  </div>
                  <select
                    {...register("hostel", { required: "Hostel is required" })}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-gray-900 appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Hostel
                    </option>
                    {Object.values(Hostel).map((hostel) => (
                      <option key={hostel} value={hostel}>
                        {hostel}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.hostel && <p className="text-sm text-red-500 mt-1.5">{errors.hostel.message}</p>}
              </div>

              {/* Due Type */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Due Type</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                    <FileSpreadsheet size={20} />
                  </div>
                  <select
                    {...register("dueType", { required: "Due type is required" })}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-gray-900 appearance-none cursor-pointer"
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
                {errors.dueType && <p className="text-sm text-red-500 mt-1.5">{errors.dueType.message}</p>}
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-4 rounded-xl text-white font-semibold transition-all duration-200 ${
                  isValid
                    ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Continue to Upload Proof
              </button>
            </div>
          ) : (
            /* STEP 2: Proof Upload */
            <div className="space-y-6 bg-white p-8 shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Upload Proof of Payment</label>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                    proofUploaded
                      ? "border-green-300 bg-green-50"
                      : "border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50/50"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    id="proofUpload"
                    onChange={handleFileUpload}
                  />

                  <label htmlFor="proofUpload" className="flex flex-col items-center gap-3 cursor-pointer">
                    {uploading ? (
                      <>
                        <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                        <span className="text-sm text-gray-600 font-medium">Uploading...</span>
                      </>
                    ) : proofUploaded ? (
                      <>
                        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle2 size={28} className="text-green-600" />
                        </div>
                        <span className="text-sm text-green-700 font-semibold">✅ Proof uploaded successfully</span>
                        <span className="text-xs text-gray-500">Click to upload a different file</span>
                      </>
                    ) : (
                      <>
                        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Upload size={28} className="text-indigo-600" />
                        </div>
                        <span className="text-sm text-gray-700 font-medium">Click to upload receipt</span>
                        <span className="text-xs text-gray-500">JPG, PNG, or PDF (Max 10MB)</span>
                      </>
                    )}
                  </label>
                </div>
                {errors.proofUrl && <p className="text-sm text-red-500 mt-2">{errors.proofUrl.message}</p>}
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 py-3.5 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!proofUploaded || submitting}
                  className={`flex-1 py-3.5 rounded-xl text-white font-semibold transition-all duration-200 ${
                    proofUploaded && !submitting
                      ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Payment"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Page;