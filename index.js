import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'
import booksRoutes from './routes/routes_book.js'
import userRoutes from './routes/routes_user.js'
import passport from 'passport'
import './utils/auth/index.js'
const app = express()
app.use(cors())
app.use(passport.initialize())
app.use(express.json())
app.use(userRoutes)
app.use(booksRoutes)
app.listen(PORT, ()=>{
    console.log(`Server running in the port: ${PORT}`)
})