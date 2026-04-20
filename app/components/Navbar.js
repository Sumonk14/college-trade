"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "../lib/supabase"

export default function Navbar() {
    const supabase = createClient()
    const [user, setUser] = useState(null)

useEffect(() => {
  // Check existing session on load
  async function getSession() {
    const { data } = await supabase.auth.getSession()
    setUser(data.session?.user ?? null)
  }
  getSession()

  // Then listen for changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      setUser(session?.user ?? null)
    }
  )
  return () => subscription.unsubscribe()
}, [])
    return (
        <nav className="bg-gray-900 text-white p-2 gap-6 flex font-bold text-xl justify-between">
          <Link href="/" className="font-bold text-xl">College Trade</Link>
          <Link href="/sell">Sell Item</Link>
          {user ? (
            <button onClick={async () => {
              await supabase.auth.signOut()
              setUser(null)
            }}>
              Logout
            </button>
          ) : (
            <Link href="/login">Login</Link>
          )}    
        </nav>
    )
}