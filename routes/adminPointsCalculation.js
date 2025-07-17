const express = require("express");
const isAuth = require("../middleware/is-auth.js");
const isAdmin = require("../middleware/is-admin.js");
const pointsCalculationService = require("../services/pointsCalculation.js");

const router = express.Router();

router.post(
  "/update-all-league-entries",
  isAuth,
  isAdmin,
  pointsCalculationService.updateAllFantasyTeamForRound
);

router.post(
  "/update-all-fantasy-teams",
  isAuth,
  isAdmin,
  pointsCalculationService.updateAllFantasyTeamForRound
);

module.exports = router;
