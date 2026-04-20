"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "../lib/supabase"

const supabase = createClient()
export default function sell() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Books")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    
    const router = useRouter()

    useEffect(() => {
        async function checkAuth() {
            const {data} = await supabase.auth.getSession()
            if (!data.session) {
                router.push("/login")
            }
        }
        checkAuth()
    }, [])
    

    async function handleSubmit(e) {
        e.preventDefault()
        let imageUrl = null

        if (image) {
            const fileName = `${Date.now()}-${image.name}`
            const {error: uploadError } = await supabase.storage
            .from("images")
            .upload(fileName, image)
        
        if (uploadError){
            console.log(uploadError)
            return
        }

        const { data: urlData } = supabase.storage
            .from("images")
            .getPublicUrl(fileName)
        imageUrl = urlData.publicUrl
        }

        const newListing = {
            title,
            price,
            description,
            category,
            image_url: imageUrl
        }
        const { error } = await supabase
        .from("listings")
        .insert([newListing])
        if (error) {
            console.log(error)
            return
        }
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
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="border rounded p-2 w-full"
                />
                <button type="submit" className="bg-blue-600 text-white border rounded p-3 w-full">Post Item</button>
                
            </form>
        </main>      
    )
}