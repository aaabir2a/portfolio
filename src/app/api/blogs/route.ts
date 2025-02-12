import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/server/db";
import { Blog } from "@/server/models/blog";

export async function GET() {
  await connectToDatabase();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json(blogs);
}

export async function POST(request: NextRequest) {
  await connectToDatabase();
  const data = await request.json();

  try {
    const newBlog = new Blog(data);
    await newBlog.save();
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog", details: (error as Error).message },
      { status: 400 }
    );
  }
}
