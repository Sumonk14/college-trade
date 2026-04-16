"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Home() {
  const [listings, setListings] = useState([])
  const [filter, setFilter] = useState("All")
  useEffect(() => {
    const existing = localStorage.getItem("listings")
    const listings = existing? JSON.parse(existing) : []
    setListings(listings)
  }, [])

  return (
    <main className="max-w-5xl mx-auto p-8">
      
      <button onClick = {() => setFilter ("All")}>All</button>
      <button onClick = {() => setFilter("Books")}>Books</button>
      <button onClick = {() => setFilter("Electronics")}>Electronics</button>
      <button onClick = {() => setFilter("Other")}>Other</button>
      <h1 className="text-3xl font-bold text-blue-600">College Trade</h1>
      <p>Buy and sell stuff on campus</p>
      <div className="grid grid-cols-3 gap-4">
      
      {listings.filter(item => filter === "All" ? true : item.category === filter).map((item) => (
        <Link href={`/item/${item.id}`} key={item.id}>
          <div key={item.id} className="border p-4 rounded-lg mb-4">
            <h2 className="text-lg">{item.title }</h2>
            <h3 className="text-green-600">{item.price}</h3>
            <h4 className="text-gray-500">{item.category}</h4>
          </div>
        </Link>
      ))}
      </div>
    </main>
  )
}
