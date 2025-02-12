"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

type Blog = {
  _id: string
  title: string
  content: string
  author: string
  image?: string
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs")
      const data = await response.json()
      setBlogs(data)
    } catch (error) {
      console.error("Error fetching blogs:", error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    setImage(file)

    // Create a preview URL for the selected image
    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)
  }

  const createBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("author", author)
      if (image) formData.append("image", image)

      const response = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      await fetchBlogs()
      setTitle("")
      setContent("")
      setAuthor("")
      setImage(null)
      setImagePreview(null)
    } catch (error) {
      console.error("Error creating blog:", error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Management</h1>
      <form onSubmit={createBlog} className="mb-4 space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full h-32"
          required
        />
        <input type="file" onChange={handleImageChange} className="border p-2 w-full" accept="image/*" />
        {imagePreview && (
          <Image
            src={imagePreview || "/placeholder.svg"}
            alt="Image preview"
            className="w-32 h-32 object-cover mt-2"
            width={128}
            height={128}
          />
        )}
        <button type="submit" className="bg-green-500 text-white p-2 w-full hover:bg-green-600 transition-colors">
          Create Blog
        </button>
      </form>
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog._id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="mt-2">{blog.content}</p>
            {blog.image && (
              <Image
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-48 object-cover mt-2 rounded"
                width={300}
                height={200}
              />
            )}
            <p className="text-sm text-gray-500 mt-2">Author: {blog.author}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

