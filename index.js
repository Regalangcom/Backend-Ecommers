const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const router = require('./routes');
const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const crypto = require('crypto');

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use(morgan('combined'));



// Routes
app.use('/api', router);

const PORT = process.env.PORT || 4000;





connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Connected to DB');
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
