// index.js (Backend)

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const app = express();

// Middleware
app.use(bodyParser.json());

// Dummy database
let users = [
  { id: 1, email: 'user@example.com', password: 'password123', resetToken: null }
];

// Route to handle forget password request
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const token = randomstring.generate(32);
  user.resetToken = token;

  // Send email with reset link
  sendResetEmail(email, token);

  return res.status(200).json({ message: 'Reset link sent successfully' });
});

// Route to handle password reset
app.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;
  const user = users.find(user => user.resetToken === token);

  if (!user) {
    return res.status(404).json({ error: 'Invalid or expired reset link' });
  }

  // Update password
  user.password = newPassword;
  user.resetToken = null;

  return res.status(200).json({ message: 'Password reset successfully' });
});

// Function to send reset email
function sendResetEmail(email, token) {
  // Configure nodemailer to send email
  // Implement nodemailer configuration here
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
