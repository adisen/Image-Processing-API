import express, { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import resizeImage from "../utils/resizeImage";

const router = express.Router();

export const testFunction = (): string => {
  return "test";
};

router.get("/", async (req: Request, res: Response) => {
  // Get query params
  const { filename, width, height } = req.query;

  try {
    // Get image from full folder
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "full",
      `${filename as string}.jpg`
    );

    const image = await fs.readFile(imagePath);
    // const metadata = await sharp(image).metadata();

    // Use sharp to resize
    await resizeImage(
      image,
      width as unknown as number,
      height as unknown as number,
      filename as string
    );
    res.send("Done");
  } catch (error) {
    console.log("file does not exist");
    res.status(404).send("File Not found");
  }
});

export default router;
