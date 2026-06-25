const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'http://localhost:4200' }));

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter on startup
transporter.verify((error) => {
  if (error) {
    console.error('Mail transporter error:', error);
  } else {
    console.log('Mail server ready');
  }
});

// POST /api/request-service
app.post('/api/request-service', async (req, res) => {
  const { name, email, phone, address, body } = req.body;

  
  if (!name || !email || !phone || !body) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }

  // Email sent to the business
  const businessMail = {
    from: `"Plumbing By Hart — Web Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_BUISNESS,
    replyTo: email,
    subject: `New Service Request from ${name}`,
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0f172a; padding: 24px 32px;">
          <h1 style="color: #fff; font-size: 20px; margin: 0; letter-spacing: 0.05em; text-transform: uppercase;">
            New Service Request
          </h1>
          <p style="color: #64748b; font-size: 13px; margin: 6px 0 0;">Plumbing By Hart — plumbingbyhart.com</p>
        </div>
        <div style="padding: 28px 32px; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-top: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; color: #1e40af;">
                <a href="mailto:${email}" style="color: #1e40af;">${email}</a>
              </td>
            </tr>
            <tr style="border-top: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; vertical-align: top;">Phone</td>
              <td style="padding: 10px 0; color: #0f172a;">
                <a href="tel:${phone}" style="color: #0f172a;">${phone}</a>
              </td>
            </tr>
            <tr style="border-top: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; vertical-align: top;">Address</td>
              <td style="padding: 10px 0; color: #0f172a;">${address || '—'}</td>
            </tr>
            <tr style="border-top: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #0f172a; white-space: pre-wrap;">${body}</td>
            </tr>
          </table>
        </div>
        <div style="background: #dc2626; padding: 14px 32px;">
          <p style="color: #fff; font-size: 12px; margin: 0; letter-spacing: 0.05em;">
            Reply directly to this email to respond to the customer.
          </p>
        </div>
      </div>
    `,
  };

  // Confirmation email sent to the customer
  const customerMail = {
    from: `"Plumbing By Hart" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'We received your service request — Plumbing By Hart',
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0f172a; padding: 24px 32px;">
          <h1 style="color: #fff; font-size: 20px; margin: 0; letter-spacing: 0.05em; text-transform: uppercase;">
            Request Received
          </h1>
          <p style="color: #64748b; font-size: 13px; margin: 6px 0 0;">Plumbing By Hart</p>
        </div>
        <div style="padding: 28px 32px; border: 1px solid #e2e8f0;">
          <p style="font-size: 15px; color: #0f172a; margin: 0 0 16px;">Hi ${name},</p>
          <p style="font-size: 14px; color: #475569; line-height: 1.7; margin: 0 0 16px;">
            Thanks for reaching out! We've received your service request and will be in touch with you shortly.
          </p>
          <p style="font-size: 14px; color: #475569; line-height: 1.7; margin: 0;">
            If you need immediate assistance, please call us directly.
          </p>
        </div>
        <div style="background: #dc2626; padding: 14px 32px;">
          <p style="color: #fff; font-size: 12px; margin: 0; letter-spacing: 0.05em;">
            Plumbing By Hart &mdash; Licensed &amp; Insured
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(businessMail);
    await transporter.sendMail(customerMail);
    res.status(200).json({ message: 'Request submitted successfully.' });
  } catch (err) {
    console.error('Failed to send email:', err);
    res.status(500).json({ message: 'Failed to send email. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});