const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const cors = require('cors');
import type { Request, Response } from 'express';

dotenv.config();

const app = express();
const port = process.env['PORT'];

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env['DB_HOST'],
  user: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

interface Tool {
  id: number;
  name: string;
  description: string;
}

app.get('/', (_: Request, res: Response) => {
  res.send('Welcome to the Rent-a-Tool API');
});

app.get('/tools', async (_: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tools');
    console.log('Retrieved tools:', rows.length, 'items');
    res.json(rows as Tool[]);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error retrieving tools:', err.message);
    } else {
      console.error('Error retrieving tools:', err);
    }
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
