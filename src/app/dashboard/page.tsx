"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ItemForm from "@/components/ItemForm"
import ItemList from "@/components/ItemList"
import Link from "next/link"

const DashboardPage = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const cookies = document.cookie.split(";")
      const isLoggedInCookie = cookies.find((cookie) => cookie.trim().startsWith("isLoggedIn="))
      if (!isLoggedInCookie || isLoggedInCookie.split("=")[1] !== "true") {
        router.push("/dashboard/login")
      } else {
        setIsLoggedIn(true)
      }
    }

    checkLoginStatus()
  }, [router])

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-gray-800">Dashboard</span>
              </div>
              <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                <button className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Home</button>
              </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => {
                  document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
                  router.push("/dashboard/login")
                }}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to the Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ItemForm/>
            <ItemList/>



          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

