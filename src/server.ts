import express, { Request, Response } from 'express'
import image from './routes/image'

const app = express()

const port = 3000

// Define routes
app.use('/api/image', image)

app.get('/', (req: Request, res: Response): void => {
    res.send('Server working as expected')
})

app.listen(port, (): void => {
    console.log(`App listening on port ${port}`)
})

export default app
