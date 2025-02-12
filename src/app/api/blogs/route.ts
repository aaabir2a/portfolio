import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/server/db";
import { Blog } from "@/server/models/blog";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const imageFile = formData.get("image") as File | null; // Ensure it's a File object

    if (!title || !content || !author) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    let imagePath = "";

    // Handle Image Upload
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Ensure uploads directory exists
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      // Create a unique filename
      const fileName = `${Date.now()}_${imageFile.name}`;
      imagePath = `/uploads/${fileName}`;
      const filePath = path.join(uploadDir, fileName);

      // Save file to disk
      await fs.writeFile(filePath, buffer);
    }

    // Create Blog entry in DB
    const newBlog = new Blog({ title, content, author, image: imagePath });
    await newBlog.save();

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const blogs = await Blog.find(); // Fetch all blogs
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
