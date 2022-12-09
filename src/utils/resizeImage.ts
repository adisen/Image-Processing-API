import sharp from "sharp";
import path from "path";

async function resizeImage(
  file: Buffer,
  width: number,
  height: number,
  filename: string
) {
  try {
    await sharp(file)
      .resize({
        width: Number(width),
        height: Number(height)
      })
      .toFormat("png", { mozjpeg: true })
      .toFile(
        path.join(__dirname, "..", "..", "thumb", `${filename as string}.png`)
      );
  } catch (error) {
    console.log(error);
  }
}

export default resizeImage;
