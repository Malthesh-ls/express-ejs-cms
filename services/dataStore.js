const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const dashboardDataPath = path.join(dataDir, 'dashboard.json');
const dbDataPath = path.join(dataDir, 'db.json');

const dashboardData = fs.existsSync(dashboardDataPath)
    ? require(dashboardDataPath)
    : {};
const dbData = fs.existsSync(dbDataPath)
    ? require(dbDataPath)
    : {};
const navigationData = dbData.navigation || {};

module.exports = {
    dashboardData,
    dashboardDataPath,
    navigationData
};
