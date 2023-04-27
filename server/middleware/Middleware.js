const formidable = require('formidable');
const fs = require('fs');

class Middleware {

    uploadFile(req, res, next) {
        const dirUpload = 'client/images';
        if (!fs.existsSync(dirUpload)) fs.mkdirSync(dirUpload);
        const form = new formidable.IncomingForm();
        form.uploadDir = dirUpload;
        form.parse(req, (err, fields, files) => {
            var formData = {};
            if (err) {
                res.status(500).send(err);
            } else {
                formData = fields;
                var isSelectedFile = !(Object.entries(files).length === 0 && files.constructor === Object);
                var key = "file";
                if (isSelectedFile) {
                    var fileName = files[key].originalFilename.split('.')[0];
                    var ext = files[key].originalFilename.split('.')[1];
                    //đường dẫn thực file upload lên
                    var newPath = `${dirUpload}/${fileName}_${Date.now()}.${ext}`;

                    var oldPath = files[key].filepath;
                    // đổi tên file
                    fs.renameSync(oldPath, newPath);

                    formData[key] = newPath.slice(14);
                } else {
                    formData[key] = '';
                }
                // console.log(formData);
                req.form_data = formData;
                next();
            }
        })
    }
}

module.exports = new Middleware();