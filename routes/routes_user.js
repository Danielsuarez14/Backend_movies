import { Router } from "express";
import { createUser, getUser } from "../controller/controller_users.js";
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config.js";
import {changePassword, sendRecovery} from '../send_email/nodemailer.js'

const router = Router()

router.post('/api/v2/user/', createUser)
router.get('/api/v2/user/:id', getUser)
router.post('/api/v2/user/auth',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user
            const payload = {
                sub: req.id,
            }
            const token = jwt.sign(payload, JWT_SECRET)
            res.status(200).json({
                user,
                token
            })
            console.log('token 👍👍')
        } catch (error) {
            next(error, 'hi')
        }
    })
router.post('/api/v2/user/auth/recovery',
    async (req, res, next) => {
        try {
            const { email } = req.body
            const rta = await sendRecovery(email)
            res.json(rta)
        } catch (error) {
            next(error)
        }
    })

router.post('/api/v2/user/change-password',
    async (req, res, next) => {
        try {
            const { token, newPassword } = req.body
            const rta = await changePassword(token, newPassword)
            res.json(rta)
        } catch (error) {
            next(error)
        }
    })
export default router