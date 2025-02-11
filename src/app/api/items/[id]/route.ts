import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/server/db";
import { Item } from "@/server/models/Item";

export async function PUT(request: NextRequest) {
  await connectToDatabase();

  try {
    // Extract `id` from the request URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Get the last part of the URL

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

    const updatedItem = await Item.findByIdAndUpdate(id, data, { new: true });

    if (!updatedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update item", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await connectToDatabase();

  try {
    // Extract `id` from the request URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Get the last part of the URL

    if (!id) {
      return NextResponse.json(
        { error: "Invalid ID provided" },
        { status: 400 }
      );
    }

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete item", details: (error as Error).message },
      { status: 500 }
    );
  }
}
