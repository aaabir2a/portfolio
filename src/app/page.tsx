
import Link from "next/link";
import ItemList from "@/components/ItemList";

const HomePage = () => {
  // Mock data for blog posts
  const blogPosts = [
    {
      id: 1,
      title: "First Blog Post",
      excerpt: "This is the first blog post.",
    },
    {
      id: 2,
      title: "Second Blog Post",
      excerpt: "This is the second blog post.",
    },
    {
      id: 3,
      title: "Third Blog Post",
      excerpt: "This is the third blog post.",
    },
    {
      id: 4,
      title: "Fourth Blog Post",
      excerpt: "This is the fourth blog post.",
    },
    {
      id: 5,
      title: "Fifth Blog Post",
      excerpt: "This is the fifth blog post.",
    },
    {
      id: 6,
      title: "Sixth Blog Post",
      excerpt: "This is the sixth blog post.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Welcome to Our Portfolio
            </h1>
            <p className="mt-6 text-xl max-w-3xl">
              We create beautiful and functional websites that help businesses
              grow.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="bg-white text-gray-900 rounded-md px-4 py-2 text-base font-medium hover:bg-gray-100"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Latest Blog Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <ItemList />
                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
     
    </div>
  );
};

export default HomePage;
