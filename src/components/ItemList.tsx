"use client";

import { useState, useEffect } from "react";
import type { Item } from "../types";

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch("/api/items");
    const data = await response.json();
    setItems(data);
  };

  const deleteItem = async (id: string) => {
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    fetchItems();
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Items</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{item.name}</h3>
            <p>{item.description}</p>
            <button
              onClick={() => deleteItem(item._id)}
              className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
