import { Router } from "express";
import { getBooks, getBook, createBook, updateBook, deleteBook, imageCreate, imageDelete, imageUpdate, imageGet } from "../controller/controller_books.js";
import passport from 'passport'

const router = Router()


router.get('/api/v1/', getBooks)
router.get('/api/v1/:id', getBook)
router.get('/api/v1/image/:id', imageGet)
router.post('/api/v1/', passport.authenticate('jwt', { session: false }), createBook)
router.post('/api/v1/image/', passport.authenticate('jwt', { session: false }), imageCreate)
router.put('/api/v1/:id', passport.authenticate('jwt', { session: false }), updateBook)
router.put('/api/v1/image/:id', passport.authenticate('jwt', { session: false }), imageUpdate)
router.delete('/api/v1/:id', passport.authenticate('jwt', { session: false }), deleteBook)
router.delete('/api/v1/image/:id', passport.authenticate('jwt', { session: false }), imageDelete)
export default router