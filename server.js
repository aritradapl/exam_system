const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// dotenv
dotenv.config();

// cors
app.use(cors());

// routes
const adminRoutes = require('./routes/admin/api');
const userRoutes = require('./routes/user/api');

const port = process.env.PORT || 3000;

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// For parsing application/json
app.use(express.json());

//For Testing
app.get('/', (req, res) => {
    res.send('Welcome');
})

// routes
app.use('/api',userRoutes);
app.use('/api/admin',adminRoutes);

// local and live server
app.listen(port, () => {
    console.log('Server is running on port http://localhost:' + port);
    // console.log('Server is running on https://exam-system-jaii.onrender.com');
});
