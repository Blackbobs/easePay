import { CreditCard } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-10 my-5">
      <Link href={"/"} className="flex items-center space-x-2">
        <div className="bg-primary p-2 rounded-full flex items-center justify-center">
      <CreditCard size={20} className="text-white" />
        </div>
        <h1 className="text-primary text-2xl font-semibold">easePay</h1>
      </Link>
    </header>
  );
};

export default Header;
