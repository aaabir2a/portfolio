import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/server/db";
import { Service } from "@/server/models/service";

export async function PUT(request: NextRequest) {
  await connectToDatabase();

  try {
    // Extract `id` from the request URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "Invalid ID provided" },
        { status: 400 }
      );
    }

    const data = await request.json();
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Invalid data provided" },
        { status: 400 }
      );
    }

    const updatedService = await Service.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedService) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedService);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update service", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await connectToDatabase();

  try {
    // Extract `id` from the request URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "Invalid ID provided" },
        { status: 400 }
      );
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete service", details: (error as Error).message },
      { status: 500 }
    );
  }
}
