"use client"
import { useState, useEffect} from "react"
import React from "react"
import Link from "next/link"


export default  function ItemPage({ params }) {
    const { id } = React.use(params)
    
    const [item, setItem  ] = useState(null)

    useEffect (() =>{
        const existing = localStorage.getItem("listings")
        const listings = existing? JSON.parse(existing) : []
        console.log("listings", listings)
        console.log("id from url", id)
        console.log("id type", typeof id)
        const found = listings.find((listing) => listing.id === Number(id))
        console.log("found", found)
        setItem(found)
    }, []) 

    if(!item) return <p> Loading...</p>

    return (
        <main className="max-w-5xl mx-auto p-8">
            <Link href="/">
                <button className="bg-blue-600 text-white border rounded p-3 w mb-6">Back</button>
            </Link>
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