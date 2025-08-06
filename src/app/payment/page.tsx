'use client'
// import { CreditCard, Mail, Shield } from 'lucide-react'
import React, { useState } from 'react'

const page = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        matricNumber: "",
        email: "",
        hostelDues: false,
        departmentDues: false,
      })
    
      const [step, setStep] = useState(1)
    
      const hostelAmount = 25000
      const departmentAmount = 5000
    
      const getTotalAmount = () => {
        let total = 0
        if (formData.hostelDues) total += hostelAmount
        if (formData.departmentDues) total += departmentAmount
        return total
      }
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (step === 1) {
          setStep(2)
        } else {
          // Process payment
          console.log("Processing payment...", formData)
        }
      }
  return (
  //   <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  //   {/* Progress Indicator */}
  //   <div className="mb-8">
  //     <div className="flex items-center justify-center space-x-4">
  //       <div
  //         className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}
  //       >
  //         1
  //       </div>
  //       <div className={`h-1 w-16 ${step >= 2 ? "bg-indigo-600" : "bg-gray-200"}`}></div>
  //       <div
  //         className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}
  //       >
  //         2
  //       </div>
  //     </div>
  //     <div className="flex justify-between text-sm text-gray-600 mt-2">
  //       <span>Student Details</span>
  //       <span>Payment</span>
  //     </div>
  //   </div>

  //   {step === 1 ? (
  //     <div>
  //       <div className="shadow-lg border-0">
  //         <div className="text-center pb-4">
  //           <div className="text-2xl font-bold text-gray-900">Enter Your Details</div>
  //           <p className="text-gray-600">We'll use this information for your receipt</p>
  //         </div>
  //         <div>
  //           <form onSubmit={handleSubmit} className="space-y-6">
  //             <div>
  //               <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
  //                 Full Name
  //               </label>
  //               <input
  //                 id="fullName"
  //                 type="text"
  //                 required
  //                 value={formData.fullName}
  //                 onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
  //                 className="mt-1"
  //                 placeholder="Enter your full name"
  //               />
  //             </div>

  //             <div>
  //               <label htmlFor="matricNumber" className="text-sm font-medium text-gray-700">
  //                 Matric Number
  //               </label>
  //               <input
  //                 id="matricNumber"
  //                 type="text"
  //                 required
  //                 value={formData.matricNumber}
  //                 onChange={(e) => setFormData({ ...formData, matricNumber: e.target.value })}
  //                 className="mt-1"
  //                 placeholder="e.g., 20/1234"
  //               />
  //               <p className="text-xs text-gray-500 mt-1">
  //                 Ensure your matric number is correct. It will appear on your receipt.
  //               </p>
  //             </div>

  //             <div>
  //               <label htmlFor="email" className="text-sm font-medium text-gray-700">
  //                 Email Address
  //               </label>
  //               <input
  //                 id="email"
  //                 type="email"
  //                 required
  //                 value={formData.email}
  //                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  //                 className="mt-1"
  //                 placeholder="your.email@example.com"
  //               />
  //               <p className="text-xs text-gray-500 mt-1">Your receipt will be sent to this email address.</p>
  //             </div>

  //             <div className="space-y-4">
  //               <label className="text-sm font-medium text-gray-700">Select Dues to Pay</Label>

  //               <div className="space-y-3">
  //                 <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
  //                   <Checkbox
  //                     id="hostelDues"
  //                     checked={formData.hostelDues}
  //                     onCheckedChange={(checked) => setFormData({ ...formData, hostelDues: checked as boolean })}
  //                   />
  //                   <div className="flex-1">
  //                     <label htmlFor="hostelDues" className="font-medium">
  //                       Hostel Dues
  //                     </label>
  //                     <p className="text-sm text-gray-600">Accommodation fees</p>
  //                   </div>
  //                   <span className="font-bold text-gray-900">₦{hostelAmount.toLocaleString()}</span>
  //                 </div>

  //                 <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
  //                   <Checkbox
  //                     id="departmentDues"
  //                     checked={formData.departmentDues}
  //                     onCheckedChange={(checked) =>
  //                       setFormData({ ...formData, departmentDues: checked as boolean })
  //                     }
  //                   />
  //                   <div className="flex-1">
  //                     <label htmlFor="departmentDues" className="font-medium">
  //                       Department Dues
  //                     </label>
  //                     <p className="text-sm text-gray-600">Departmental fees</p>
  //                   </div>
  //                   <span className="font-bold text-gray-900">₦{departmentAmount.toLocaleString()}</span>
  //                 </div>
  //               </div>

  //               {(formData.hostelDues || formData.departmentDues) && (
  //                 <div
  //                   className="bg-indigo-50 p-4 rounded-lg border border-indigo-200"
  //                 >
  //                   <div className="flex justify-between items-center">
  //                     <span className="font-medium text-indigo-900">Total Amount:</span>
  //                     <span className="text-xl font-bold text-indigo-900">
  //                       ₦{getTotalAmount().toLocaleString()}
  //                     </span>
  //                   </div>
  //                 </div>
  //               )}
  //             </div>

  //             <button
  //               type="submit"
  //               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3"
  //               disabled={
  //                 !formData.fullName ||
  //                 !formData.matricNumber ||
  //                 !formData.email ||
  //                 (!formData.hostelDues && !formData.departmentDues)
  //               }
  //             >
  //               Continue to Payment
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   ) : (
  //     <div>
  //       <div className="shadow-lg border-0">
  //         <div className="text-center pb-4">
  //           <div className="text-2xl font-bold text-gray-900">Complete Payment</div>
  //           <p className="text-gray-600">Review your details and complete payment</p>
  //         </div>
  //         <div>
  //           {/* Payment Summary */}
  //           <div className="bg-gray-50 p-4 rounded-lg mb-6">
  //             <h3 className="font-medium text-gray-900 mb-3">Payment Summary</h3>
  //             <div className="space-y-2 text-sm">
  //               <div className="flex justify-between">
  //                 <span>Name:</span>
  //                 <span className="font-medium">{formData.fullName}</span>
  //               </div>
  //               <div className="flex justify-between">
  //                 <span>Matric Number:</span>
  //                 <span className="font-medium">{formData.matricNumber}</span>
  //               </div>
  //               <div className="flex justify-between">
  //                 <span>Email:</span>
  //                 <span className="font-medium">{formData.email}</span>
  //               </div>
  //               <hr className="my-2" />
  //               {formData.hostelDues && (
  //                 <div className="flex justify-between">
  //                   <span>Hostel Dues:</span>
  //                   <span className="font-medium">₦{hostelAmount.toLocaleString()}</span>
  //                 </div>
  //               )}
  //               {formData.departmentDues && (
  //                 <div className="flex justify-between">
  //                   <span>Department Dues:</span>
  //                   <span className="font-medium">₦{departmentAmount.toLocaleString()}</span>
  //                 </div>
  //               )}
  //               <hr className="my-2" />
  //               <div className="flex justify-between font-bold text-lg">
  //                 <span>Total:</span>
  //                 <span>₦{getTotalAmount().toLocaleString()}</span>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Payment Methods */}
  //           <div className="space-y-4 mb-6">
  //             <h3 className="font-medium text-gray-900">Choose Payment Method</h3>
  //             <div className="grid gap-3">
  //               <button className="p-4 h-auto justify-start bg-transparent">
  //                 <CreditCard className="w-5 h-5 mr-3" />
  //                 <div className="text-left">
  //                   <div className="font-medium">div Payment</div>
  //                   <div className="text-sm text-gray-600">Pay with debit/credit div</div>
  //                 </div>
  //               </button>
  //               <button className="p-4 h-auto justify-start bg-transparent">
  //                 <Shield className="w-5 h-5 mr-3" />
  //                 <div className="text-left">
  //                   <div className="font-medium">Bank Transfer</div>
  //                   <div className="text-sm text-gray-600">Direct bank transfer</div>
  //                 </div>
  //               </button>
  //               <button className="p-4 h-auto justify-start bg-transparent">
  //                 <Mail className="w-5 h-5 mr-3" />
  //                 <div className="text-left">
  //                   <div className="font-medium">USSD</div>
  //                   <div className="text-sm text-gray-600">Pay via USSD code</div>
  //                 </div>
  //               </button>
  //             </div>
  //           </div>

  //           <div className="flex space-x-3">
  //             <button onClick={() => setStep(1)} className="flex-1">
  //               Back
  //             </button>
  //             <button  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
  //               Pay Now
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )}
  // </div>

<h1>hello</h1>
  )
}

export default page