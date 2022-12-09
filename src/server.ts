import express from "express";
import image from "./routes/image";

const app = express();

const port = 3000;

// Define routes
app.use("/api/image", image);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
