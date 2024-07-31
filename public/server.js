const express = require('express');
const app = express();
const path = require('path');
const sendEmail = require('./functions/SendTestEmail');

app.use(express.json());
app.use(express.static('public'));

// Route for sending email
app.post('/api/send-email', async (req, res) => {
    const { name, email, phone, message, type } = req.body;

    try {
        const result = await sendEmail(name, email, phone, message, type);
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;