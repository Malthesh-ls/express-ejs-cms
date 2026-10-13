const express = require('express');
const fs = require('fs');
const {
    dashboardData,
    dashboardDataPath
} = require('../services/dataStore');

const router = express.Router();

router.get('/', async (req, res) => {
    const totalUsers = (dashboardData.reports?.totalUsers || 0) + 1;
    const currentActiveUsers = (dashboardData.reports?.activeUsers || 0) + 1;
    const currentConversionRate = (currentActiveUsers / totalUsers) * 100;

    const dashboardUpdateData = {
        ...dashboardData,
        reports: {
            ...dashboardData.reports,
            totalUsers,
            activeUsers: currentActiveUsers,
            conversionRate: currentConversionRate.toFixed(2)
        }
    };

    fs.promises.writeFile(dashboardDataPath, `${JSON.stringify(dashboardUpdateData, null, 2)}\n`);

    res.render('index', {
        title: dashboardData.settings?.siteTitle || 'My CMS',
        description: dashboardData.settings?.description || 'default description',
        tagLine: dashboardData.settings?.tagLine || 'default tagline',
        pageName: 'Home'
    });
});

module.exports = router;
