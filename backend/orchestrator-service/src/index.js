const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const studentDashboardRouter = require('./routes/studentDashboard');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5010;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/', studentDashboardRouter);

// Test route (προαιρετικό)
app.get('/', (req, res) => {
  res.send('🟢 Orchestrator service is running');
});

app.listen(PORT, () => {
  console.log(`✅ Orchestrator listening on port ${PORT}`);
});
