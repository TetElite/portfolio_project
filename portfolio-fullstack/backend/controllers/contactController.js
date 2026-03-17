const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json({ success: true, message: 'Message sent!' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
