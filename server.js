const express = require('express');
const fileUpload = require('express-fileupload');

const PORT = (5000 || process.env.PORT);

const app = express();
app.use(fileUpload());

//upload endpoint
app.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({msg: 'no file is upload'});
    }
    const file = req.files.file;
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});
    });
})

app.listen(PORT, () => {console.log('Server is up and running')});