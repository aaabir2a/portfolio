"use client";

import { useEffect, useState } from "react";

type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const createBlog = async () => {
    try {
      await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, author }),
      });
      fetchBlogs();
      setTitle("");
      setContent("");
      setAuthor("");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const updateBlog = async () => {
    if (!editingBlog) return;
    try {
      await fetch(`/api/blogs/${editingBlog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, author }),
      });
      fetchBlogs();
      setEditingBlog(null);
      setTitle("");
      setContent("");
      setAuthor("");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 mr-2"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2"
        />
        {editingBlog ? (
          <button
            onClick={updateBlog}
            className="bg-blue-500 text-white p-2 ml-2"
          >
            Update Blog
          </button>
        ) : (
          <button
            onClick={createBlog}
            className="bg-green-500 text-white p-2 ml-2"
          >
            Create Blog
          </button>
        )}
      </div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id} className="border p-4 mb-2">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.content}</p>
            <p className="text-sm text-gray-500">Author: {blog.author}</p>
            <button
              onClick={() => {
                setEditingBlog(blog);
                setTitle(blog.title);
                setContent(blog.content);
                setAuthor(blog.author);
              }}
              className="bg-yellow-500 text-white p-2 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteBlog(blog._id)}
              className="bg-red-500 text-white p-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
