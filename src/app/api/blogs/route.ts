import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/server/db";
import { Blog } from "@/server/models/blog";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const image = formData.get("image") as string; // Image URL from upload API

    if (!title || !content || !author) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newBlog = new Blog({ title, content, author, image });
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
