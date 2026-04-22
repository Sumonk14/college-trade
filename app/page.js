"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "./lib/supabase"

const supabase = createClient()
export default function Home() {
  const [listings, setListings] = useState([])
  const [filter, setFilter] = useState("All")
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getSession()
      setCurrentUser(data.session?.user ?? null)
    }
    getUser()
  }, [])
  
  useEffect(() => {
    async function fetchListings() {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
      if (error) {
        console.log(error)
        return 
      }
      setListings(data)

    }
    fetchListings()      
  }, [])

  async function handleDelete(id) {
    await supabase.from("listings").delete().eq("id", id)
    setListings(listings.filter(item => item.id !== id))
  }
  

  return (
    <main className="max-w-5xl mx-auto p-8">
      
      <button onClick = {() => setFilter ("All")}className={`border rounded px-4 py-2 mr-2 ${filter === "All" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}>All</button>
      <button onClick = {() => setFilter("Books")}className={`border rounded px-4 py-2 mr-2 ${filter === "Books" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}>Books</button>
      <button onClick = {() => setFilter("Electronics")}className={`border rounded px-4 py-2 mr-2 ${filter === "Electronics" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}>Electronics</button>
      <button onClick = {() => setFilter("Utensils")}className={`border rounded px-4 py-2 mr-2 ${filter === "Utensils" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}>Utensils</button>
      <button onClick = {() => setFilter("Other")}className={`border rounded px-4 py-2 mr-2 ${filter === "Other" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}>Other</button>
      <h1 className="text-3xl font-bold text-blue-600">College Trade</h1>
      <p>Buy and sell stuff on campus</p>
      <div className="grid grid-cols-3 gap-4">
      
      {listings.filter(item => filter === "All" ? true : item.category === filter).map((item) => (
        <div key={item.id}>
        <Link href={`/item/${item.id}`} key={item.id}>
          <div key={item.id} className="border p-4 rounded-lg mb-4">
            {item.image_url && (
              <img src={item.image_url} alt={item.article} className="w-full h-48 object-cover rounded mb-2" />
            )}
            <h2 className="text-lg">{item.title }</h2>
            <h3 className="text-green-600">{item.price}</h3>
            <h4 className="text-gray-500">{item.category}</h4>
          </div>
        </Link>
        {currentUser && currentUser.id === item.user_id && (
          <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white text-sm px-3 py-1 rounded mt-2 w-full hover:bg-red-600">
            Delete
          </button>
        )}
      </div>
      ))}
      </div> 
    </main>
  )
}
