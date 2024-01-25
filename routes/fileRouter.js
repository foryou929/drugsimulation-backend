const path = require('path')
const fileCtr = require(path.resolve('./controllers/fileCtr'))

const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

module.exports = (app) => {
    app.post('/api/file', upload.array('files'), fileCtr.create)
    app.get('/api/file/:_id', fileCtr.read)
}