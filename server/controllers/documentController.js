const Document = require('../models/Document');

exports.createDocument = async (req, res) => {
  try {
    const { name, address } = req.body;
    let picturePaths = [];

    if (req.files && req.files.length > 0) {
      picturePaths = req.files.map(file => {
        const relativePath = file.path.replace(/\\/g, '/').split('uploads/')[1];
        return relativePath ? `uploads/${relativePath}` : file.filename;
      });
    } else if (req.file) {
      const relativePath = req.file.path.replace(/\\/g, '/').split('uploads/')[1];
      picturePaths = [relativePath ? `uploads/${relativePath}` : req.file.filename];
    }

    const document = new Document({
      name,
      address,
      picturePath: picturePaths,
    });

    await document.save();

    res.status(201).json({ message: 'Document saved', document });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
