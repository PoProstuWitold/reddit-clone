import { extname } from "path";
import { makeId } from "../utils";

export const editFileName = (req, file, callback) => {
    const name = makeId(20);
    callback(null, name + extname(file.originalname))
};