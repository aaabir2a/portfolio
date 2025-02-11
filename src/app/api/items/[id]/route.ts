import { NextResponse } from "next/server";
import { connectToDatabase } from "@/server/db";
import { Item } from "@/server/models/Item";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const data = await request.json();
  const updatedItem = await Item.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updatedItem);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  await Item.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Item deleted successfully" });
}
