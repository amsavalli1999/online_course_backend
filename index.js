const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const routers = require('./routes/index')
dotenv.config();
connectDB();

const app = express();
app.use(express.json());           // parse JSON bodies
app.use(cors());
app.use(morgan('dev'));           // request logging in dev

// routes
app.use(routers);

// root
app.get('/', (req, res) => res.send('API Running'));

// error handler middleware (put after routes)
const { errorHandler } = require('./middleware/error');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
