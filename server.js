// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer'); // Import Nodemailer

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3002; // Port where the server will listen

// MongoDB connection URI (IPv4)
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/BharatYuvaVikasFoundation'; // Updated DB name

// Connecting to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// Define the Donation schema and model
const donationSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  amount: { type: Number, required: true }
}, { collection: 'donationdata' }); // Updated collection name

const Donation = mongoose.model('Donation', donationSchema);

// Define the Contact schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  message: { type: String, required: true }
}, { collection: 'contactdata' }); // Collection for contact form data

const Contact = mongoose.model('Contact', contactSchema);

// Middleware to serve static files and parse incoming form data
app.use(express.static(path.join(__dirname, 'public'))); // Serving static HTML, CSS, JS
app.use(express.json()); // For parsing JSON payloads
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Route to serve the donation form (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'donation-page.html')); // Serving the donation page
});

// POST route to handle donation form submissions
app.post('/submit-donation', async (req, res) => {
  const { name, mobile, email, amount } = req.body;

  // Perform basic validation
  if (!name || !mobile || !email || !amount) {
    return res.status(400).json({ message: 'Please fill in all the required fields.' });
  }

  // Create a new donation record
  const donation = new Donation({ name, mobile, email, amount });

  try {
    // Save the donation to the database
    await donation.save();
    res.status(201).json({
      message: `Thank you, ${name}, for your donation of $${amount}! We will send a confirmation to ${email}.`
    });
  } catch (err) {
    console.error("Error saving donation:", err);
    res.status(500).json({ message: 'There was an error processing your donation.' });
  }
});

// POST route to handle contact form submissions
app.post('/submit-contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Perform basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill in all the required fields.' });
  }

  // Create a new contact record
  const contact = new Contact({ name, email, message });

  try {
    // Save the contact data to the database
    await contact.save();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS // Your email password or app password
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER, // Where to send the email
      subject: `New Contact Form Submission from ${name}`,
      text: `You have a new message from ${name} (${email}):\n\n${message}`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: `Thank you, ${name}, for reaching out! We will get back to you at ${email}.`
    });
  } catch (err) {
    console.error("Error saving contact data:", err);
    res.status(500).json({ message: 'There was an error processing your contact form submission.' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
