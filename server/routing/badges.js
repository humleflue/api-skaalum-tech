const express = require(`express`);
const router = express.Router();

const badges = require(`../models/github/badges`);

router.get(`/name`, badges.name);
router.get(`/age`, badges.age);
router.get(`/occupation`, badges.occupation);
router.get(`/place-of-occupation`, badges.placeOfOccupation);
router.get(`/country`, badges.country);
router.get(`/city`, badges.city);

module.exports = router;
