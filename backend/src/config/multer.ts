import multer from "multer";

const imgUpload = multer({
    limits: {
        fieldNameSize: 1024 * 1024 * 20,
    },
});

export default imgUpload;