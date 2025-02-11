import ItemList from "@/components/ItemList";
import ItemForm from "@/components/ItemForm";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Item Manager</h1>
      <ItemForm />
      <ItemList />
    </main>
  );
}
