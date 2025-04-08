import { pool } from "../database/db.js";
import { createImage, deleteImage, updateImage, getImage } from '../cloudinary_server/cloudinary.js'

export const getBooks = async (req, res) => {
    try {
        const [result] = await pool.query(
            `SELECT id_book, name, title, publication_year FROM books
            INNER JOIN authors 
            ON id = id_author;`
        )
        res.status(200).json(result)
    } catch (error) {
        console.error(`GetBooks: ${error}`)
    }
    
}

export const getBook = async (req, res) => {
    try {
        const [result] = await pool.query(
            `SELECT id_author, name, title, publication_year FROM books
            INNER JOIN authors 
            ON id = id_author
            WHERE id_book = ?;`,[req.params.id]
        )
        res.status(200).json(result[0])
    } catch (error) {
        console.error(`GetBook: ${error}`)
    }
    
}
export const createBook = async (req, res) => {
    try {
        const {id_author, title, publication_year} = req.body
    const result = await pool.query(
        `INSERT INTO books (id_author, title, publication_year) VALUES (?, ?, ?);`,
        [id_author, title, publication_year]
    )
    res.status(200).json(result)
    } catch (error) {
        console.error(`Create: ${error}`)
    }
    
}

export const updateBook = async (req, res) => {
    try {
        const result = await pool.query(
            `UPDATE books SET ? WHERE id_book = ?;`,[req.body, req.params.id]
        )
        res.status(200).json(result)
    } catch (error) {
        console.error(`Update: ${error}`)
    }
    
}

export const deleteBook = async(req, res) => {
    try {
        const result = await pool.query(
            `DELETE FROM books WHERE id_book = ?;`,[req.params.id]
        )
        res.status(200).json(result)
    } catch (error) {
        console.error(`Delete: ${error}`)
    }
    
}

export const imageGet = async(req, res) => {
    try {
        const id = req.params.id
        const imageUrl = await getImage(id)
        res.status(200).json(imageUrl)
    } catch (error) {
        console.log(error)
        res.json(500)
    }
}

export const imageCreate = async (req, res) =>{
    try {
        const {url, id} = req.body
        const imageUrl = await createImage(url, id)
        res.status(200).json(imageUrl)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
} 
export const imageDelete = async (req, res) =>{
    try {
        const id = req.params.id
        const imageUrl = await deleteImage(id)
        res.status(200).json(imageUrl)
    } catch (error) {
        res.status(500)
    }
}

export const imageUpdate = async(req, res) => {
    try {
        const id = req.params.id
        const {url} = req.body
        const imageUrl = await updateImage(url, id)
        res.status(200).json(imageUrl)
    } catch (error) {
        console.log(error)
    }
}