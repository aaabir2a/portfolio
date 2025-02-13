import express from "express";
import { connectToDatabase } from "./db";
import { itemRouter } from "./routes/items";
import { blogRouter } from "./routes/blog";
import { serviceRouter } from "./routes/service";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Use routes
app.use("/api/items", itemRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/services", serviceRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
