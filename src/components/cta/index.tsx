import Link from "next/link";
import React from "react";

const Cta = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to skip the queue?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Pay your hostel and departmental dues online in just a few clicks
          </p>
          <Link href="/payment">
            <button className="bg-primary rounded-full text-white px-8 py-3 text-lg">
              Pay Your Dues Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
