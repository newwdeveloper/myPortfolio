import express from "express";
const router = express.Router();
import nodemailer from "nodemailer";
import { check, validationResult } from "express-validator";

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // your Gmail app password
  },
});

// POST route to handle contact form submission
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("message", "Message is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    // HTML formatted email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p style="font-size: 0.9em; color: #888;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ msg: "Message sent successfully" });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ msg: "Failed to send message" });
    }
  }
);

export default router;
