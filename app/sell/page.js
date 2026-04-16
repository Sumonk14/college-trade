"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function sell() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Books")
    const [price, setPrice] = useState("")
    
    const router = useRouter()
    

    function handleSubmit(e) {
        e.preventDefault()
        const newListing = {
            id: Date.now(),
            title,
            price,
            description,
            category
        }
        const existing = localStorage.getItem("listings")
        const listings = existing? JSON.parse(existing) : []
        listings.push(newListing)
        localStorage.setItem("listings", JSON.stringify(listings))
        setTitle("")
        setDescription("")
        setCategory("")
        setPrice("")
        router.push("/")
        
    }

    return(
        <main className="max-w-5xl mx-auto p-8">
            <h1 className="font-bold text-xl mb-6">Post an Item</h1>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input className="border rounded p-2 w-full"
                placeholder ="Item name"
                value={title}
                onChange = {(e) => setTitle(e.target. value)}
                />

                <input className="border rounded p-2 w-full"
                placeholder = "Price"
                value={price}
                onChange = {(e) => setPrice(e.target. value)}

                />
                <textarea className="border rounded p-2 w-full"
                placeholder = "Description" 
                value={description}
                onChange = {(e) => setDescription(e.target. value)}
                />
                <select className="border rounded p-2 w-full"
                value={category}
                onChange = {(e) => setCategory(e.target.value)}>
                    <option>Books</option>
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Other</option>
                </select> 
                <button type="submit" className="bg-blue-600 text-white border rounded p-3 w-full">Post Item</button>
                
            </form>
        </main>      
    )
}