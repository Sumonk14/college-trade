"use client"
import { useState, useEffect} from "react"
import React from "react"
import Link from "next/link"
import { createClient } from "../../lib/supabase"

const supabase = createClient()
export default  function ItemPage({ params }) {
    const { id } = React.use(params)
    
    const [item, setItem  ] = useState(null)

    useEffect (() =>{
        async function fetchListings() {
        const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single()
        if (error) {
        console.log(error)
        return 
        }
        setItem(data)
        }
        fetchListings()
    }, []) 

    if(!item) return <p> Loading...</p>

    return (
        <main className="max-w-5xl mx-auto p-8">
            <Link href="/">
                <button className="bg-blue-600 text-white border rounded p-3 w mb-6">Back</button>
            </Link>
            {item.image_url && (
                <img src={item.image_url} alt={item.title} className="w-full h-64 object-cover rounded-lg mb-6" />
            )}
                <h1 className="text-3xl font-bold">{item.title}</h1>
                <p className="text-2xl font-bold text-green-600">{item.price}</p>
                <p className="mt-4 text-gray-600">{item.description}</p>
                <p className="bg-gray-100 px-2 py-1 rounded text-sm mt-4">{item.category}</p>
                <a
                    href={`https://wa.me/919990824354?text=I'm interested in ${item.title}`}
                    target="_blank"
                    className="bg-green-500 text-white rounded p-3 mt-6 inline-block"
                >
                    Contact Seller on WhatsApp
                </a>
                
                
        </main>
    )
}