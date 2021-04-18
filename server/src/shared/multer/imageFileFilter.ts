import { HttpException, HttpStatus } from "@nestjs/common";

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new HttpException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Only image files are allowed!',
            error: 'Bad Request'
        }, HttpStatus.BAD_REQUEST), false);
    }
    callback(null, true);
}