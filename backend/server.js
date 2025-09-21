// backend/server.js

const express = require('express');
const cors = require('cors');
const analyticsRouter = require('./routes/analytics');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/analytics', analyticsRouter);

// Start server without a database sync
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));