const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

// routes
const adminRoutes = require('./routes/admin/api');
const userRoutes = require('./routes/user/api');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// database connect
require('./config/database');

//For Testing
app.get('/', (req, res) => {
    res.send('Welcome');
})

// routes
app.use('/api',userRoutes);
app.use('/api/admin',adminRoutes);

// server
app.listen(port, () => {
    // console.log('Server is running on port http://localhost:' + port);
    console.log('Server is running on https://exam-system-jaii.onrender.com');
});
