import nodemailer from "nodemailer"
import { findByEmail, addRecoveryToken, updatePassword, findOne } from "../controller/controller_users.js";
import boom from "@hapi/boom";
import { JWT_SECRET } from "../config.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export async function sendRecovery(email) {
    const user = await findByEmail(email)
    if (!user) {
        throw boom.unauthorized()
    }
    const payload = { sub: user.id }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15min' })
    const link = `http://localhost:5173/changepassword/?token=${token}`
    
    const mail = {
        from: process.env.EMAIL_ACCOUNT,
        to: email,
        subject: "Email para recuperar contrasena",
        html: `<b>Ingresa a este link => ${link}</b>`,
    }
    addRecoveryToken(token, user.id)
    const rta = await sendMail(mail)
    return rta
}

export async function changePassword(token, newPassword) {
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        const user = await findOne(payload.sub)
        if (user.recovery_token !== token) {
            console.log('hola')
            throw boom.unauthorized()
        }
        const hash = await bcrypt.hash(newPassword, 10)
        await updatePassword(hash, user.id)
        addRecoveryToken(null, user.id)
        return { message: 'Password change' }
    } catch (error) {
        throw error
    }
}

export async function sendMail(infoMail) {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    await transporter.sendMail(infoMail)
    return { message: 'Mail sent' }
}


