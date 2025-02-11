import Menu from "../../components/Menu"
import Footer from "../../components/Footer"
import Link from "next/link"

const BlogPage = () => {
  // Mock data for blog posts
  const blogPosts = [
    { id: 1, title: "First Blog Post", excerpt: "This is the first blog post.", date: "2023-05-01" },
    { id: 2, title: "Second Blog Post", excerpt: "This is the second blog post.", date: "2023-05-05" },
    { id: 3, title: "Third Blog Post", excerpt: "This is the third blog post.", date: "2023-05-10" },
    { id: 4, title: "Fourth Blog Post", excerpt: "This is the fourth blog post.", date: "2023-05-15" },
    { id: 5, title: "Fifth Blog Post", excerpt: "This is the fifth blog post.", date: "2023-05-20" },
    { id: 6, title: "Sixth Blog Post", excerpt: "This is the sixth blog post.", date: "2023-05-25" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Menu />
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <Link href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default BlogPage

