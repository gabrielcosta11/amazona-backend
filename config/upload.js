import multer from 'multer';
import path from 'path';


const dirname = 'C:\Users\Usuario\Documents\Portifólio-Programçao\amazona\backend'
const dest = path.resolve(toString(process.cwd()), '..', '..', 'frontend', 'public', 'uploads');

export default {

    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, dest)
        },
        filename(req, file, cb) {
            cb(null, `${Date.now()}.jpg`)
        }
    })
};