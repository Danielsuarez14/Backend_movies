import { pool } from "../database/db.js";
import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        const hash = await bcrypt.hash(password, 10)
        const result = await pool.query(`
            INSERT INTO users (name, email, password) VALUES (?,?,?);`,[name, email, hash])
            res.json(result)
    } catch (error) {
        console.error(`Create User: ${error}`)
    }
    
}

export const getUser = async(req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, email FROM users WHERE id = ?;`, [req.params.id]
        )
        res.json(result[0])
    } catch (error) {
        console.error(`Get user: ${error}`)
    }
}

export const findOne = async(id) => {
    try {
        const [result] = await pool.query(
            `SELECT * FROM users WHERE id = ?;`, [id]
        )
       return(result[0])
    } catch (error) {
        console.log(`Get user: ${error}`)
    }
}


export const findByEmail = async(user_email) => {
    try {
        const [email] = await pool.query(
            `SELECT * FROM users WHERE email = ?;`,[user_email]
        )
        if (email.length === 0){
            return false
        }
        return email[0]
    } catch (error) {
        console.log(error)
    }
}

export const addRecoveryToken = async(token, id) => {
    try {
        let result = await pool.query(
                `UPDATE users SET recovery_token = ? WHERE id = ?;`,[token, id]
        )
        return result
    } catch (error) {
        console.error(error)
    }
}

export const updatePassword = async(newPassword, id) => {
    try {
        const result = await pool.query(
            `UPDATE users SET password = ? WHERE id = ?;`,[newPassword, id]
        )
        return result
    } catch (error) {
        console.error(error)
    }
}