import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import TokenPayload from '../interfaces/token-payload.interface'
import { Request } from 'express';

const cookieExtractor = function (req) {
    let token = null;
    if (req && req.signedCookies && req.signedCookies.jwt) {
        token = req.signedCookies['jwt']['token'];
    }
    return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                // ExtractJwt.fromAuthHeaderAsBearerToken(), 
                // ExtractJwt.fromUrlQueryParameter('x_auth_access'),
                // ExtractJwt.fromBodyField('accessToken'),
                (request: Request) => {
                    return request?.cookies.x_auth_access
                }
            ]),
            secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
        });
    }

  async validate(payload: TokenPayload) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        console.log(user)
        return user;
  }
}