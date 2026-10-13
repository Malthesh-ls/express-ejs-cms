const express = require('express');
const path = require('path');
const session = require('express-session');

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const publicRoutes = require('./routes/public');
const addViewLocals = require('./middleware/viewLocals');

const app = express();
const PORT = 3000;

app.use(addViewLocals);
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-super-safe-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);
app.use(adminRoutes);
app.use(publicRoutes);

app.listen(PORT, () => {
    console.log(`Server executing successfully on http://localhost:${PORT}`);
});
