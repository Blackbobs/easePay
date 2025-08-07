import { Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="p-4 flex flex-col items-center justify-center">
      <div className="inline-flex items-center px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium my-6">
        <Zap className="w-4 h-4 mr-2" />
        Fast & Secure Payments
      </div>

      <div className="my-5">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Pay Your School Dues
          <span className="block text-primary">Online in Minutes</span>
        </h1>

        <p className="text-sm text-gray-600 mb-8 max-w-3xl mx-auto">
          No queues. No paperwork. Just fast, secure payments from your phone.
          Get your receipt instantly via email.
        </p>
      </div>

      <div className="flex flex-row md:flex-row gap-4 justify-center">
        <Link href={"/payment"}>
          <button className="bg-primary rounded-full text-white font-medium px-6 py-2 text-sm border-2 border-primary">
            Start Payment
          </button>
        </Link>
        <Link href="/check-receipt">
          <button className="px-6 py-2 text-sm bg-transparent font-medium border-2 border-primary rounded-full hover:bg-primary hover:text-white">
            Check Your Receipts
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
