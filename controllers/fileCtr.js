const { model } = require('mongoose')
const File = model('File')
const contentDisposition = require("content-disposition");
const fs = require('fs')

exports.create = async (req, res) => {
    try {
        const files = req.files;
        const result = []
        for (let i = 0; i < files.length; i++) {
            const file = await File.create({
                filename: files[i].filename,
                originalname: files[i].originalname,
                mimetype: files[i].mimetype,
                size: files[i].size
            })
            result.push(file)
        };
        res.json({ message: 'file_uploaded', result })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.read = async (req, res) => {
    try {
        const { _id } = req.params
        const file = await File.findOne({ _id })
        if (file) {
            res.writeHead(200, {
                "Content-Type": file.mimetype + "***" + encodeURIComponent(file.originalname),
                "Content-Encoding": "utf8",
                "Content-Disposition": contentDisposition(file.originalname),
                "Content-Transfer-Encoding": "binary",
                "Content-Length": file.size || 0,
                "Cache-Control": "private, no-transform, no-store, must-revalidate",
                Expires: 0,
            });
            res.end(fs.readFileSync('uploads/' + file.filename), "binary");
            return
        }
        res.status(404).json({ message: 'file_not_available' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}