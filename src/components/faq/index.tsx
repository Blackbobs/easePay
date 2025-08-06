"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What if I lose my payment receipt?",
      answer:
        "No worries! Use our 'Check Your Dues' feature to retrieve all your payment records and resend receipts to your email.",
    },
    {
      question: "How do I know if my payment was successful?",
      answer:
        "You'll receive an instant email confirmation with your receipt. You can also check your payment status anytime using your matric number and email.",
    },
    {
      question: "Which payment methods are supported?",
      answer:
        "We support debit/credit cards, bank transfers, and USSD payments from all major Nigerian banks.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes! We use bank-level encryption and your payments go directly to the school's official account.",
    },
  ];

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-5 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600">
            Everything you need to know about EduPay
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-lg shadow transition-all duration-300"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
                >
                  <h3 className="text-base font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  {isOpen ? (
                    <ChevronUp className="text-primary w-5 h-5" />
                  ) : (
                    <ChevronDown className="text-primary w-5 h-5" />
                  )}
                </button>

                {isOpen && (
                  <div className="text-xs px-6 pb-4 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
