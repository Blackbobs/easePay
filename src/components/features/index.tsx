import {
  CheckCircle,
  CreditCard,
  Download,
  Mail,
  Phone,
  Shield,
} from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #008e9b08 0%, #4d807608 50%, #008e9b04 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with premium styling */}
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
            style={{
              backgroundColor: "#008e9b1a",
              borderColor: "#008e9b40",
            }}
          >
            <span style={{ color: "#008e9b" }} className="text-sm font-medium">
              Why Choose Excellence
            </span>
          </div>
          <h2
            className="text-4xl sm:text-6xl font-black mb-6 leading-tight"
            style={{ color: "#1a1a1a" }}
          >
            Why Students Love{" "}
            <span
              className="animate-pulse"
              style={{
                background: `linear-gradient(135deg, #008e9b, #4d8076)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              easepay
            </span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: "#666666" }}>
            Built for the next generation of students, trusted by premium
            institutions worldwide
          </p>
        </div>

        {/* Features grid with premium cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: CheckCircle,
              title: "No Registration Required",
              desc: "Pay instantly without creating an account",
              gradient: "#008e9b",
              secondary: "#4d8076",
            },
            {
              icon: Shield,
              title: "Secure & Fast",
              desc: "Bank-level security with instant confirmations",
              gradient: "#008e9b",
              secondary: "#4d8076",
            },
            {
              icon: Mail,
              title: "Email Receipts",
              desc: "Get your receipt via email immediately",
              gradient: "#008e9b",
              secondary: "#4d8076",
            },
            {
              icon: Phone,
              title: "Mobile Optimized",
              desc: "Works perfectly on your smartphone",
              gradient: "#008e9b",
              secondary: "#4d8076",
            },
            {
              icon: CreditCard,
              title: "Multiple Payment Options",
              desc: "Card, bank transfer, and USSD supported",
              gradient: "#008e9b",
              secondary: "#4d8076",
            },
            {
              icon: Download,
              title: "Instant Download",
              desc: "Download your receipt as PDF anytime",
              gradient: "#008e9b",
              secondary: "#4d8076",
            },
          ].map((feature, index) => (
            <div key={index} className="group relative">
              {/* Glow effect */}
              <div
                className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                style={{
                  background: `linear-gradient(135deg, ${feature.gradient}40, ${feature.secondary}40)`,
                }}
              ></div>

              {/* Main card */}
              <div
                className="relative rounded-2xl p-8 h-full transform transition-all duration-300 hover:scale-105 border"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#008e9b20",
                  boxShadow: "0 4px 20px rgba(0, 142, 155, 0.1)",
                }}
              >
                {/* Icon with gradient background */}
                <div className="w-16 h-16 bg-primary rounded-2xl p-3 mb-6 transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <feature.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold mb-3 transition-all duration-300"
                  style={{ color: "#1a1a1a" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="leading-relaxed transition-colors duration-300"
                  style={{ color: "#666666" }}
                >
                  {feature.desc}
                </p>

                {/* Subtle accent line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${feature.gradient}, ${feature.secondary})`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex bg-secondary items-center justify-center px-8 py-4 rounded-full text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer">
            Experience the Difference Today
            <div className="ml-2 w-2 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-ping"
            style={{
              backgroundColor: "#008e9b40",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}

      </div>
        <div className="bg-primary p-5 my-5">
          <Shield className="w-12 h-12 text-white mx-auto mb-4" />
          <h3 className="text-xl font-bold text-center text-white mb-2">
            Your payments go directly to the admin account
          </h3>
          <p className="text-indigo-100 text-sm text-center">
            Secure, transparent, and school-approved
          </p>
        </div>
    </section>
  );
};

export default Features;
