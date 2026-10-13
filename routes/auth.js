const express = require('express');
const bcrypt = require('bcrypt');
const { dashboardData } = require('../services/dataStore');

const router = express.Router();

router.get('/login', (req, res) => {
    if (req.session.isAdmin) {
        return res.redirect('/admin/dashboard');
    }

    res.render('login', {
        title: dashboardData.settings?.siteTitle || 'My CMS',
        pageName: 'Login',
        errorMessage: null
    });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDetails = dashboardData.users?.find(user => user.username === username);

    if (!userDetails) {
        return res.render('login', { errorMessage: 'Invalid username or password.' });
    }

    const saltRounds = 10;
    try {
        const storedHash = await bcrypt.hash(userDetails.password, saltRounds);
        const isMatch = await bcrypt.compare(password, storedHash);

        if (isMatch) {
            req.session.isAdmin = true;
            req.session.username = username;
            return res.redirect('/admin/dashboard');
        }

        return res.render('login', { errorMessage: 'Invalid username or password.' });
    } catch (error) {
        return res.render('login', { errorMessage: 'Server error, try again later.' });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;
