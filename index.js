const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv11111').config();

- 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/send', async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Configure your email transport (using Gmail as an example)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_gmail@gmail.com', // replace with your Gmail
      pass: 'your_gmail_app_password', // replace with your Gmail App Password
    },
  });

  const mailOptions = {
    from: 'your_gmail@gmail.com', // sender address
    to: 'ABC@ABC.com', // recipient address
    subject: 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.get('/api/ai-news', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: 'Give me a JSON array of the top 10 AI news headlines of the week. For each, include title, summary, and a link to the news source. No commentary, just the array.'
          }
        ]
      },
      {
        headers: {
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        }
      }
    );
    console.log('Claude API response:', response.data);
    let news = [];
    try {
      news = JSON.parse(response.data.content[0].text);
    } catch (e) {
      console.error('Failed to parse Claude response:', response.data.content[0].text);
      return res.status(500).json({ error: 'Failed to parse Claude response.' });
    }
    res.json({ news });
  } catch (err) {
    console.error('Claude API error:', err.response ? err.response.data : err.message);
    res.status(500).json({ error: 'Failed to fetch AI news.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 
