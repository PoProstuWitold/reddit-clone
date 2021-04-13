import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import TokenPayload from '../interfaces/token-payload.interface'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy,'jwt-refresh-token') {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService
    ) {
        super({
        jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
            return request?.cookies?.x_auth_refresh
        }]),
            secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
            passReqToCallback: true,
        })
    }

    async validate(request: Request, payload: TokenPayload) {
        const refreshToken = request.cookies?.x_auth_refresh
        return this.authService.getUserIfRefreshTokenValid(refreshToken, payload.userId)
    }
}