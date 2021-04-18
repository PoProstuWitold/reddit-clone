import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Sub from "../sub.entity";

export class OwnSubGuard extends AuthGuard('jwt') {
    constructor(
        @InjectRepository(Sub)
        private subRepository: Repository<Sub>
    ) {
        super()
    }
    // Override handleRequest so it never throws an error
    //@ts-ignore
    async handleRequest(err, user, info, context) {
        const req = context.switchToHttp().getRequest();
        const sub = await this.subRepository.findOneOrFail({ where: { name: req.params.name } })
        if(user.id !== sub.userId || err) {
            throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                message: `You don't own this sub`,
                error: `Forbidden`
            }, 403)
        }
        req.sub = sub
        return user;
    }
  
}