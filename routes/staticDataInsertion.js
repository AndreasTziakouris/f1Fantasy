const express = require("express");
const isAuth = require("../middleware/is-auth.js");
const isAdmin = require("../middleware/is-admin.js");
const staticDataInsertionService = require("../services/staticDataInsertion.js");

const router = express.Router();

router.post(
  "/insert-f1-driver-data",
  isAuth,
  isAdmin,
  staticDataInsertionService.insertf1DriverData
);

router.post(
  "/insert-f1-team-data",
  isAuth,
  isAdmin,
  staticDataInsertionService.insertf1TeamData
);
router.post(
  "/insert-f1-race-data",
  isAuth,
  isAdmin,
  staticDataInsertionService.insertf1RaceResults
);

module.exports = router;
