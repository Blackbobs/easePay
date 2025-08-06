import { CreditCard, Download, Shield, Users } from "lucide-react";
import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            How It Works in 3 Easy Steps
          </h2>
          <p className="text-sm text-gray-600 text-center">
            Simple, fast, and secure payment process
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 space-y-2">
          {[
            {
              step: "01",
              title: "Enter Your Details",
              description:
                "Provide your name, matric number, and email address",
              icon: Users,
            },
            {
              step: "02",
              title: "Select & Pay",
              description:
                "Choose your dues and pay with card, transfer, or USSD",
              icon: CreditCard,
            },
            {
              step: "03",
              title: "Get Receipt",
              description:
                "Download your receipt instantly and receive it via email",
              icon: Download,
            },
          ].map((item, index) => (
            <div key={index}>
              <div className="text-center p-6 h-full border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                <div className="pt-6">
                  <div className="w-16 h-16 bg-gray-100 border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-sm font-bold text-[#ff9671] mb-2">
                    STEP {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default HowItWorks;
