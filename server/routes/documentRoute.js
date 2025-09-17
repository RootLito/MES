const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const documentController = require('../controllers/documentController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// router.post(
//   '/upload',
//   upload.array('pictures', 7), 
//   documentController.createDocument
// );
router.post('/upload', (req, res, next) => {
  upload.array('pictures', 7)(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ error: 'Too many files uploaded. Maximum is 7.' });
      }
      return res.status(400).json({ error: err.message });
    }
    documentController.createDocument(req, res, next);
  });
});

router.get('/', async (req, res) => {
  try {
    const docs = await require('../models/Document').find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
