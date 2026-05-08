"use client"
import { useState } from "react"
import { createClient } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function Login() {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const router = useRouter()
  const [sent, setSent] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ email, options:
      {emailRedirectTo: window.location.origin}
    })
    if (error) {console.log(error); return}
    setSent(true)
  }

  if (sent) {
  return (
    <main className="max-w-md mx-auto p-8 mt-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Check your email!</h1>
      <p className="text-gray-600">We sent a magic link to {email}</p>
    </main>
  )
}
  return (
    <main className="max-w-md mx-auto p-8 mt-20">
      <h1 className="text-3xl font-bold mb-6">Login to sell</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input 
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded p-2"
        />
       
        
        <button type="button" onClick={handleLogin} className="bg-blue-600 text-white rounded p-3">Login</button>
       
      </form>
    </main>
  )
}