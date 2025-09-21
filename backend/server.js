import dotenv from "dotenv";

const express = require('express');
const cors = require('cors');
const analyticsRouter = require('./routes/analytics');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/analytics', analyticsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));