import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';

export const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname, '..', '..', '..', 'uploads'))
    },
    filename: (req, file, cb) => {
      let fileHash = crypto.randomBytes(8).toString("hex");
      cb(null, `${fileHash}-${file.originalname}`);
    },
  })
})