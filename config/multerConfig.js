import multer from 'multer';
import path from 'path';
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config();

aws.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(toString(process.cwd()), '..', 'tmp', 'uploads'))
        },
        filename:(req, file, cb) => {
            cb(null, `${Date.now()}.jpg`)
        }
    }),

    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'amazona-bucket-02-22',
        acl:'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key(req, file, cb) {
            cb(null, Date.now() + file.originalname)
        }
    })
};

const multerConfig = (storageS3 = false) => {
    return {
        dest: path.resolve(toString(process.cwd()), '..', 'tmp', 'uploads'),
        storage: storageS3 ? storageTypes.s3 : storageTypes.local
    }
}


export default multerConfig