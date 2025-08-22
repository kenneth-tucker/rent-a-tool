const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
import type { Request, Response } from 'express';

dotenv.config();

const app = express();
const port = process.env['PORT'];

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const {sequelize, initializeDatabase} = require('./db');
initializeDatabase();
// Register the models with Sequelize
require('./models/user');
// Sync the models with the database
sequelize.sync();


// Health check endpoint
app.get('/', (_: Request, res: Response) => {
  res.send('Welcome to the Rent-a-Tool API');
});

// Endpoint for creating a new account
app.post('/register', async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const user = await sequelize.models.User.create({ email, password, firstName, lastName });
    res.status(201).json({ account: { email: user.email } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint for logging into an existing account
app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await sequelize.models.User.findOne({ where: { email, password } });
    if (user) {
      res.json({ account: { email: user.email } });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
