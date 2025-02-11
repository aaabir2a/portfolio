import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/server/db";
import { Item } from "@/server/models/Item";

export async function GET() {
  await connectToDatabase();
  const items = await Item.find();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  await connectToDatabase();
  const data = await request.json();
  const newItem = new Item(data);
  await newItem.save();
  return NextResponse.json(newItem, { status: 201 });
}
