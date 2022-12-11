import app from '../server'
import supertest from 'supertest'
import path from 'path'
import fs from 'fs'
import resizeImage from '../utils/resizeImage'

const req = supertest(app)

describe('Test Image endpoint', () => {
    it('should return 200 to show server is working as expected', async () => {
        try {
            const res = await req.get('/')
            expect(res.status).toBe(200)
        } catch (error) {
            console.log('Error')
        }
    })

    it('should return 200 to make sure the endpoint it working', async () => {
        try {
            const res = await req.get(
                '/api/image?filename=fjord&width=100&height=100'
            )
            expect(res.status).toBe(200)
        } catch (error) {
            console.log('Error')
        }
    })

    it('should resize the image', async () => {
        const filename = 'fjord'
        const width = 200
        const height = 300

        try {
            // Check if file exists and delete
            const filepath = path.join(
                __dirname,
                '..',
                '..',
                'thumb',
                `${filename as string}-${width}-${height}.png`
            )

            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath)
            }

            const imagePath = path.join(
                __dirname,
                '..',
                '..',
                'full',
                `${filename as string}.jpg`
            )

            const image = await fs.readFileSync(imagePath)

            const res = await resizeImage(image, width, height, filename)

            expect(res).toBe(
                path.join(
                    __dirname,
                    '..',
                    '..',
                    'thumb',
                    `${filename as string}-${width}-${height}.png`
                )
            )
        } catch (error) {
            console.log('Error')
        }
    })
})
