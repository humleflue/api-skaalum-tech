// const path = require(`path`);
const express = require(`express`);
const router = express.Router();

// const HTTPError = require(`./helpers/HTTPError`);

const checkDatabaseConnection = require(`../models/checkDatabaseConnection`);

const badges = require(`./badges`);

const biler = require(`../models/biler`);
const me    = require(`../models/me`);

router.use(`/badges`, badges);

router.get(`/`, checkDatabaseConnection);
router.get(`/biler`, biler.get);
router.get(`/me`, me.get);

module.exports = router;
