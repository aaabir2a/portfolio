import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

// Configure multer storage
const upload = multer({ dest: "public/uploads/" });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const ext = path.extname(file.name);
    const filePath = `public/uploads/${Date.now()}${ext}`;

    // Read file as buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Write file to disk
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ imageUrl: `/${filePath}` });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
