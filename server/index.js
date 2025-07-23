const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Replace with your Gmail credentials and recipient
const GMAIL_USER = 'yourgmail@gmail.com'; // <-- replace with your Gmail address
const GMAIL_PASS = 'your-app-password';   // <-- replace with your Gmail App Password
const RECIPIENT_EMAIL = 'recipient@gmail.com'; // <-- replace with the recipient's email

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

app.post('/send-email', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const mailOptions = {
    from: GMAIL_USER,
    to: RECIPIENT_EMAIL,
    subject: 'New Form Submission',
    text: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 