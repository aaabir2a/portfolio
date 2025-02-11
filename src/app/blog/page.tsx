import Menu from "../../components/Menu"
import Footer from "../../components/Footer"

import ItemForm from "@/components/ItemForm"
import ItemList from "@/components/ItemList"

const BlogPage = () => {
  

  return (
    <div className="min-h-screen flex flex-col">
      <Menu />
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ItemForm/>
            <ItemList/>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default BlogPage

