const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Set up multer storage (store files in 'uploads' folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Upload file route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileLink = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ message: 'File uploaded successfully', fileLink });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
