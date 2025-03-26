import { Strategy } from "passport-local";
import { findByEmail } from "../../../controller/controller_users.js";
import boom from "@hapi/boom";
import bcrypt from 'bcrypt'

export const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await findByEmail(email)
        if (!user) {
            done(boom.unauthorized(), false)
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            done(boom.unauthorized(), false)
        }
        const new_user = {
            "id": user.id,
            "name": user.name,
            "email": user.email

        }
        done(null, new_user)
    } catch (error) {
        done(error, false)
    }
})

