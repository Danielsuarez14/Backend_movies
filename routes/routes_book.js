import { Router } from "express";
import { getBooks, getBook, createBook, updateBook, deleteBook } from "../controller/controller_books.js";
import passport from 'passport'

const router = Router()

router.get('/api/v1/',getBooks)
router.get('/api/v1/:id', getBook)
router.post('/api/v1/', passport.authenticate('jwt', { session: false }),createBook)
router.put('/api/v1/:id', passport.authenticate('jwt', { session: false }),updateBook)
router.delete('/api/v1/:id', passport.authenticate('jwt', { session: false }),deleteBook)



export default router