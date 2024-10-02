var express = require('express');
var cors = require('cors');
var multer = require('multer'); // Multer for file uploads
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Serve the HTML file with the form
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Set up multer for handling file uploads
var upload = multer({ dest: 'uploads/' }); // 'uploads/' is the directory to store files

// Handle file upload POST request
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  // Respond with file details
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
