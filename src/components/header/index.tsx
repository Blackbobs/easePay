import { CreditCard } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between container rounded-full mx-auto shadow-md p-5 my-2">
      <Link href={"/"} className="flex items-center space-x-2">
        <div className="bg-primary p-2 rounded-full flex items-center justify-center">
      <CreditCard size={20} className="text-white" />
        </div>
        <h1 className="text-primary text-2xl font-semibold">easePay</h1>
      </Link>
      <div>
        <Link href={"#!"} className="bg-primary rounded-full text-white px-4 py-2 font-medium">Admin</Link>
      </div>
    </header>
  );
};

export default Header;
