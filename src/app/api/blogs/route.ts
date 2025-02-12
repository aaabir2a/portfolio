import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/server/db"
import { Blog } from "@/server/models/blog"
import path from "path"
import fs from "fs/promises"

export async function POST(req: NextRequest) {
  await connectToDatabase()

  try {
    const formData = await req.formData()
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const author = formData.get("author") as string
    const imageFile = formData.get("image")

    console.log("Received form data:", { title, content, author, imageFile })

    if (!title || !content || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let imagePath = ""

    if (imageFile && imageFile instanceof File) {
      console.log("Processing image file:", imageFile.name)
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadDir = path.join(process.cwd(), "public", "uploads")
      await fs.mkdir(uploadDir, { recursive: true })

      const fileExtension = path.extname(imageFile.name)
      const fileName = `${Date.now()}${fileExtension}`
      imagePath = `/uploads/${fileName}`
      const filePath = path.join(uploadDir, fileName)

      await fs.writeFile(filePath, buffer)
      console.log(`Image saved at: ${filePath}`)
    } else {
      console.log("No valid image file provided")
    }

    const newBlog = new Blog({
      title,
      content,
      author,
      image: imagePath,
    })

    const savedBlog = await newBlog.save()
    console.log(`New blog created:`, savedBlog)

    return NextResponse.json(savedBlog, { status: 201 })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "Failed to create blog", details: (error as Error).message }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectToDatabase()

    const blogs = await Blog.find()
    return NextResponse.json(blogs, { status: 200 })
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

