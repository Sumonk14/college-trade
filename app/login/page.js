"use client"
import { useState } from "react"
import { createClient } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function Login() {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password})
    if (error) {console.log(error); return}
    router.push("/")   
    }
  async function handleSignup(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password})
    if (error) { console.log(error); return }
    router.push("/")     
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
        
        <input 
          placeholder="Your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded p-2"
        />
        
        <button type="button" onClick={handleLogin} className="bg-blue-600 text-white rounded p-3">Login</button>
        <button type="button" onClick={handleSignup} className="bg-gray-600 text-white rounded p-3">Sign Up</button>
      </form>
    </main>
  )
}