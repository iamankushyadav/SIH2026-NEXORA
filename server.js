require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User, Internship, Job } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let databaseConnection;
const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) return;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured.');
  databaseConnection ??= mongoose.connect(process.env.MONGODB_URI).catch((error) => {
    databaseConnection = undefined;
    throw error;
  });
  await databaseConnection;
};

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured.');
  return process.env.JWT_SECRET;
};

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'PATHFINDER API' }));
app.post('/api/auth/register', async (req, res, next) => {
  try {
    await connectDatabase();
    const { name, email, password, role = 'Student' } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), passwordHash, role });
    res.status(201).json({ token: jwt.sign({ id: user.id, role: user.role }, getJwtSecret(), { expiresIn: '7d' }), user: { id: user.id, name, email: user.email, role: user.role } });
  } catch (error) { next(error); }
});
app.post('/api/auth/login', async (req, res, next) => {
  try {
    await connectDatabase();
    const user = await User.findOne({ email: req.body.email?.toLowerCase() });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.passwordHash))) return res.status(401).json({ message: 'Invalid email or password.' });
    res.json({ token: jwt.sign({ id: user.id, role: user.role }, getJwtSecret(), { expiresIn: '7d' }), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) { next(error); }
});
app.get('/api/opportunities', async (_req, res, next) => {
  try {
    await connectDatabase();
    const [internships, jobs] = await Promise.all([Internship.find().populate('company', 'name'), Job.find().populate('company', 'name')]);
    res.json({ internships, jobs });
  } catch (error) { next(error); }
});
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error.' });
});

const port = process.env.PORT || 4000;
if (require.main === module) {
  connectDatabase()
    .then(async () => {
      if (process.env.DEMO_PASSWORD) {
        const demoPassword = await bcrypt.hash(process.env.DEMO_PASSWORD, 10);
        await User.updateOne({ email: 'student@pathfinder.demo' }, { $setOnInsert: { name: 'Ankush Sharma', email: 'student@pathfinder.demo', passwordHash: demoPassword, role: 'Student' } }, { upsert: true });
        await User.updateOne({ email: 'recruiter@pathfinder.demo' }, { $setOnInsert: { name: 'PATHFINDER Labs', email: 'recruiter@pathfinder.demo', passwordHash: demoPassword, role: 'Industry' } }, { upsert: true });
      }
      app.listen(port, () => console.log(`PATHFINDER API listening on ${port}`));
    })
    .catch((error) => { console.error('MongoDB connection failed:', error.message); process.exitCode = 1; });
}
module.exports = app;
