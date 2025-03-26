import {Strategy, ExtractJwt} from 'passport-jwt'
import { JWT_SECRET } from '../../../config.js'

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}

export const JwtStrategy = new Strategy(options, (payload, done)=>{
    return done(null, payload)
})
