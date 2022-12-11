import express, { Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'
import resizeImage from '../utils/resizeImage'

const router = express.Router()

router.get('/', async (req: Request, res: Response): Promise<void> => {
    // Get query params
    const { filename, width, height } = req.query

    if (filename === undefined) {
        res.status(400).send('A filename is required')
        return
    }

    if (width === undefined || isNaN(Number(width)) || +width <= 0) {
        res.status(400).send('Width needs to be a number greater than 0')
        return
    }

    if (height === undefined || isNaN(Number(height)) || +height <= 0) {
        res.status(400).send('Height needs to be a number greater than 0')
        return
    }

    try {
        // Get image from full folder
        const imagePath = path.join(
            __dirname,
            '..',
            '..',
            'full',
            `${filename as string}.jpg`
        )

        const image = await fs.readFile(imagePath)
        // const metadata = await sharp(image).metadata();

        // Use sharp to resize
        const result = await resizeImage(
            image,
            width as unknown as number,
            height as unknown as number,
            filename as string
        )

        res.sendFile(result)
    } catch (error) {
        res.status(404).send('File Not found')
    }
})

export default router
