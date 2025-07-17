const express = require("express");
const isAuth = require("../middleware/is-auth.js");
const isAdmin = require("../middleware/is-admin.js");
const pointsCalculationService = require("../services/pointsCalculation.js");
const adminFantasyLeaguesController = require("../controllers/adminFantasyLeague.js");

const router = express.Router();

router.put(
  "/update-league",
  isAuth,
  isAdmin,
  adminFantasyLeaguesController.updateFantasyLeague
);

router.delete(
  "/delete-league",
  isAuth,
  isAdmin,
  adminFantasyLeaguesController.deleteFantasyLeague
);

module.exports = router;
