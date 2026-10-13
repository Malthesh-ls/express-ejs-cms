const express = require('express');
const fs = require('fs');
const requireAdminAuth = require('../middleware/requireAdminAuth');
const {
    dashboardData,
    dashboardDataPath,
    navigationData
} = require('../services/dataStore');

const router = express.Router();

router.get('/admin/dashboard', requireAdminAuth, (req, res) => {
    res.render('admin', {
        adminUser: req.session.username,
        pageTitle: 'Admin Dashboard',
        pageDescription: 'Welcome to the Admin Dashboard. Here you can manage your content and settings.',
        pageName: 'Dashboard',
        user: req.session.username,
        data: dashboardData
    });
});

router.get('/admin/pages', requireAdminAuth, (req, res) => {
    res.render('admin', {
        adminUser: req.session.username,
        navigationData,
        pageTitle: 'Admin Pages',
        user: req.session.username,
        pageDescription: 'Manage your website pages here. You can create, edit, and delete pages as needed.',
        pageName: 'Pages'
    });
});

router.get('/admin/settings', requireAdminAuth, (req, res) => {
    res.render('admin', {
        adminUser: req.session.username,
        pageTitle: 'Admin Settings',
        user: req.session.username,
        pageDescription: 'Manage your website settings here.',
        pageName: 'Settings',
        settingsData: dashboardData.settings || {}
    });
});

router.get('/admin/profile', requireAdminAuth, (req, res) => {
    res.render('admin', {
        adminUser: req.session.username,
        pageTitle: 'Admin Profile',
        user: req.session.username,
        pageDescription: 'View and manage your admin profile here.',
        pageName: 'Profile',
        profileData: dashboardData.users?.find(user => user.username === req.session.username) || {}
    });
});

router.get('/admin', (req, res) => {
    res.redirect('/admin/dashboard');
});

router.post('/admin/updateProfile', async (req, res, next) => {
    const body = req.body || {};
    const { firstName, lastName, email, city, state, country } = body;
    const stringFields = [firstName, lastName, email, city, state, country];

    if (!stringFields.every(value => typeof value === 'string')) {
        return res.status(400).send('Invalid profile data.');
    }

    dashboardData.users = dashboardData.users.map(user => {
        if (user.username === req.session.username) {
            return { ...user, firstName, lastName, email, city, state, country };
        }
        return user;
    });

    try {
        await fs.promises.writeFile(dashboardDataPath, `${JSON.stringify(dashboardData, null, 2)}\n`);
        return res.redirect('/admin/profile');
    } catch (error) {
        return next(error);
    }
});

router.post('/admin/updateSettings', async (req, res, next) => {
    const body = req.body || {};
    const { siteTitle, tagLine, adminEmail, timezone, language, description } = body;
    const stringFields = [siteTitle, tagLine, adminEmail, timezone, language, description];

    if (!stringFields.every(value => typeof value === 'string')) {
        return res.status(400).send('Invalid settings data.');
    }

    dashboardData.settings = {
        ...dashboardData.settings,
        siteTitle,
        tagLine,
        adminEmail,
        timezone,
        language,
        searchEngineIndexing: body.searchEngineIndex === 'true',
        description
    };

    try {
        await fs.promises.writeFile(dashboardDataPath, `${JSON.stringify(dashboardData, null, 2)}\n`);
        return res.redirect('/admin/settings');
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
