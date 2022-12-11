import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

async function resizeImage(
    file: Buffer,
    width: number,
    height: number,
    filename: string
): Promise<string> {
    // Check if a file has been resized already
    const fileName = path.join(
        __dirname,
        '..',
        '..',
        'thumb',
        `${filename as string}-${width}-${height}.png`
    )

    if (fs.existsSync(fileName)) {
        return fileName
    }

    // Else resize
    await sharp(file)
        .resize({
            width: Number(width),
            height: Number(height),
        })
        .toFormat('png', { mozjpeg: true })
        .toFile(
            path.join(
                __dirname,
                '..',
                '..',
                'thumb',
                `${filename as string}-${width}-${height}.png`
            )
        )

    return fileName
}

export default resizeImage
