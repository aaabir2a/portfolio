"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setImage(file);

    // Upload image first
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const createBlog = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", author);
      if (imageUrl) formData.append("image", imageUrl);

      await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });
      fetchBlogs();
      setTitle("");
      setContent("");
      setAuthor("");
      setImage(null);
      setImageUrl("");
    } catch (error) {
      console.error("Error creating blog:", error);
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
        <input
          type="file"
          onChange={handleImageUpload}
          className="border p-2 mt-2"
        />
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Uploaded preview"
            className="w-32 h-32 object-cover mt-2"
          />
        )}
        <button
          onClick={createBlog}
          className="bg-green-500 text-white p-2 ml-2"
        >
          Create Blog
        </button>
      </div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id} className="border p-4 mb-2">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.content}</p>
            {blog.image && (
              <Image
                src={blog.image}
                alt={blog.title}
                className="w-32 h-32 object-cover mt-2"
              />
            )}
            <p className="text-sm text-gray-500">Author: {blog.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
