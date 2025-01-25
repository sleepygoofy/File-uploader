const express = require('express');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

// Initialize dotenv for environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Set up multer storage (files will be stored in the "uploads" folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Serve static files (uploaded files)
app.use('/uploads', express.static('uploads'));

// Serve the frontend HTML file
app.use(express.static('public'));

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Create a link to the uploaded file
  const fileLink = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ message: 'File uploaded successfully', fileLink });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
