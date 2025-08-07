"use client"

import { useMemo, useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { Search, Filter, Download, ArrowLeft } from "lucide-react"

interface Transaction {
  id: string
  name: string
  matric: string
  email: string
  amount: number
  type: string
  paymentMethod: string
  status: string
  date: string
  time: string
}



const transactions: Transaction[] = [
  {
    id: "TXN001",
    name: "Adebayo Johnson",
    matric: "20/1234",
    email: "adebayo.johnson@student.edu",
    amount: 30000,
    type: "Hostel + Department",
    paymentMethod: "Card",
    status: "Success",
    date: "2024-01-15",
    time: "14:30",
  },
  {
    id: "TXN002",
    name: "Fatima Ahmed",
    matric: "20/5678",
    email: "fatima.ahmed@student.edu",
    amount: 25000,
    type: "Hostel",
    paymentMethod: "Transfer",
    status: "Success",
    date: "2024-01-15",
    time: "12:15",
  },
  {
    id: "TXN003",
    name: "Chidi Okafor",
    matric: "20/9012",
    email: "chidi.okafor@student.edu",
    amount: 5000,
    type: "Department",
    paymentMethod: "USSD",
    status: "Pending",
    date: "2024-01-14",
    time: "16:45",
  },
  {
    id: "TXN004",
    name: "Aisha Bello",
    matric: "20/3456",
    email: "aisha.bello@student.edu",
    amount: 30000,
    type: "Hostel + Department",
    paymentMethod: "Card",
    status: "Success",
    date: "2024-01-14",
    time: "10:20",
  },
  {
    id: "TXN005",
    name: "Emeka Nwankwo",
    matric: "20/7890",
    email: "emeka.nwankwo@student.edu",
    amount: 25000,
    type: "Hostel",
    paymentMethod: "Transfer",
    status: "Failed",
    date: "2024-01-13",
    time: "09:30",
  },
  {
    id: "TXN006",
    name: "Kemi Adeyemi",
    matric: "20/2468",
    email: "kemi.adeyemi@student.edu",
    amount: 5000,
    type: "Department",
    paymentMethod: "Card",
    status: "Success",
    date: "2024-01-13",
    time: "15:10",
  },
]

const columnHelper = createColumnHelper<Transaction>()

const columns = [
  columnHelper.accessor("id", {
    header: "Transaction ID",
    cell: (info) => <span className="font-mono text-sm text-primary">{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: "student",
    header: "Student",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-nowrap text-gray-900">{row.original.name}</div>
        <div className="text-sm text-gray-600">{row.original.matric}</div>
      </div>
    ),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => <span className="text-sm text-gray-600">{info.getValue()}</span>,
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => <span className="font-medium text-primary">₦{info.getValue().toLocaleString()}</span>,
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => <span className="text-gray-600 text-nowrap">{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: "dateTime",
    header: "Date & Time",
    cell: ({ row }) => (
      <div className="text-sm">
        <div className="text-gray-900">{row.original.date}</div>
        <div className="text-gray-600">{row.original.time}</div>
      </div>
    ),
  }),
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: searchTerm,
    },
    onGlobalFilterChange: setSearchTerm,
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase()
      return (
        row.original.name.toLowerCase().includes(search) ||
        row.original.matric.includes(search) ||
        row.original.email.toLowerCase().includes(search)
      )
    },
  })

  const total = useMemo(() => {
    return table.getFilteredRowModel().rows.reduce(
      (sum, row) => sum + row.original.amount, 0
    )
  }, [table.getFilteredRowModel().rows])

  return (
    <div className="min-h-screen bg-gray-50">

    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900">All Transactions</h1>
        <p className="text-gray-600 text-sm mb-6">View and manage all student payments</p>

        {/* Filters and Search */}
        <div className="bg-white p-4 md:p-6 shadow-md rounded-lg mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, matric number, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div className="flex gap-2">
              <button className="border border-gray-300 px-4 py-2 rounded-md flex items-center text-sm hover:bg-gray-100">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="border text-primary border-gray-300 px-4 py-2 rounded-md flex items-center text-sm hover:bg-gray-100">
                <Download className="w-4 h-4 mr-2 text-primary" />
                Export
              </button>
            </div>
          </div>
        </div>

      
        <div className="bg-white shadow-md rounded-lg">
          <div className="px-6 py-4 flex justify-between items-center">
            <span className="font-semibold">  Transactions <span className="text-secondary">({table.getFilteredRowModel().rows.length})</span></span>
            <span className="text-sm font-semibold text-secondary">Total: ₦{total.toLocaleString()}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-secondary text-white">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="p-4 text-nowrap font-medium">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row, i) => (
                  <tr key={row.id} className={
                    i % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  )
}
