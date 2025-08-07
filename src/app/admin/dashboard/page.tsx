"use client";

import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import Link from "next/link";
import {
  CreditCard,
  Users,
  TrendingUp,
  Download,
  Eye,
  LogOut,
  DollarSign,
  Calendar,
  Filter,
} from "lucide-react";

// Mock data
const stats = [
  {
    title: "Total Revenue",
    value: "₦2,450,000",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Total Payments",
    value: "156",
    change: "+8.2%",
    icon: CreditCard,
    color: "text-blue-600",
  },
  {
    title: "Active Students",
    value: "89",
    change: "+5.1%",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "This Month",
    value: "₦485,000",
    change: "+15.3%",
    icon: Calendar,
    color: "text-amber-600",
  },
];

const recentTransactions = [
  {
    id: "TXN001",
    name: "Adebayo Johnson",
    matric: "20/1234",
    amount: 30000,
    type: "Hostel + Department",
    status: "Success",
    date: "2024-01-15",
  },
  {
    id: "TXN002",
    name: "Fatima Ahmed",
    matric: "20/5678",
    amount: 25000,
    type: "Hostel",
    status: "Success",
    date: "2024-01-15",
  },
  {
    id: "TXN003",
    name: "Chidi Okafor",
    matric: "20/9012",
    amount: 5000,
    type: "Department",
    status: "Pending",
    date: "2024-01-14",
  },
  {
    id: "TXN004",
    name: "Aisha Bello",
    matric: "20/3456",
    amount: 30000,
    type: "Hostel + Department",
    status: "Success",
    date: "2024-01-14",
  },
];

type Transaction = {
  id: string;
  name: string;
  matric: string;
  amount: number;
  type: string;
  status: string;
  date: string;
};

export default function AdminDashboard() {
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "name",
      header: "Student",
      cell: (info) => (
        <div className="font-medium text-nowrap text-gray-900">
          {info.getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: "matric",
      header: "Matric No.",
      cell: (info) => (
        <div className="text-gray-600">{info.getValue() as string}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info) => (
        <div className="font-medium text-primary">
          ₦{Number(info.getValue()).toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: (info) => (
        <div className="text-gray-600 text-nowrap">{info.getValue() as string}</div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (info) => (
        <div className="text-gray-600 text-nowrap">{info.getValue() as string}</div>
      ),
    },
  ];

  const table = useReactTable({
    data: recentTransactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 text-sm">
            Monitor student payments and platform performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border-0 shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm ${stat.color} font-medium flex items-center mt-1`}
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      
        <div className="bg-white border-0 shadow-md rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-base text-nowrap font-bold">Recent Transactions</h2>
            <Link href="/admin/transactions">
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer">
                View All Transactions
              </button>
            </Link>
          </div>
          <div className="py-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="p-4 text-nowrap bg-secondary text-white font-medium">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row, i) => (
                    <tr
                      key={row.id}
                      className={
                        i % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50 hover:bg-gray-100"
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-4 text-gray-800">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
