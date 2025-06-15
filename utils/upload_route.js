const multer = require('multer');
const path = require('path');
const fs = require('fs');

const routeDir = 'uploads/routes';
if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, routeDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const uploadRoute = multer({ storage });

module.exports = uploadRoute;
