const path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const routes = require('./controllers');
const sequelize = require('./client/config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Configure session
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// Apply middleware
app.use(session(sess));

// Configure CORS
app.use(cors({
    origin: ['https://johannysunisex-cdc945aa3db4.herokuapp.com', 'http://localhost:5173'], // Allow multiple origins
    credentials: true, // Allow cookies with requests
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Add routes
app.use(routes);

// Handle client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});