import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/server/db";
import { Service } from "@/server/models/service";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    console.log("Received form data:", { title, content });

    if (!title || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newService = new Service({
      title,
      content,
    });

    const savedService = await newService.save();
    console.log(`New service created:`, savedService);

    return NextResponse.json(savedService, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create blog", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const services = await Service.find();
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
