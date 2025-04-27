const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Multer config
const upload = multer({ dest: 'server/uploads/' });
const allowedTypes = ['image/png', 'image/jpeg', 'video/mp4', 'video/quicktime'];

// Upload + trigger Python
app.post('/upload', upload.fields([{ name: 'file1' }, { name: 'file2' }]), async (req, res) => {
  const files = req.files;

  if (!files.file1 || !files.file2) {
    return res.status(400).json({ error: "Two files are required." });
  }

  const file1 = files.file1[0];
  const file2 = files.file2[0];

  if (!allowedTypes.includes(file1.mimetype) || !allowedTypes.includes(file2.mimetype)) {
    return res.status(400).json({ error: "Invalid file type. Must be .png, .jpg, .mov, or .mp4." });
  }

  try {
    const file1Path = path.resolve(file1.path);
    const file2Path = path.resolve(file2.path);

    const python = spawn('python', ['server/testfile.py', file1Path, file2Path]);

    let output = '';
    let errorOutput = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    python.on('close', (code) => {
      if (code === 0) {
        console.log('Python script finished.');
        const videoUrlMatch = output.match(/Got transition video: (https:\/\/[^\s]+)/);
        if (videoUrlMatch) {
          const finalVideoUrl = videoUrlMatch[1];
          res.json({ videoUrl: finalVideoUrl });
        } else {
          console.error('Failed to find video URL in output:', output);
          res.status(500).json({ error: "Failed to extract video URL." });
        }
      } else {
        console.error('Python script error:', errorOutput);
        res.status(500).json({ error: "Python processing failed." });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
