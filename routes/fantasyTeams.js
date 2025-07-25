const express = require("express");
const isAuth = require("../middleware/is-auth.js");

const fantasyTeamsController = require("../controllers/fantasyTeams.js");

const router = express.Router();

router.get(
  "/get-fantasy-teams",
  isAuth,
  fantasyTeamsController.getAllFantasyTeams
);

router.get(
  "/get-fantasy-team/:fantasyTeamId",
  isAuth,
  fantasyTeamsController.getFantasyTeam
);

router.put("/fantasy-team", isAuth, fantasyTeamsController.updateFantasyTeam);

router.get("/f1drivers", isAuth, fantasyTeamsController.getF1Drivers);

router.get("/f1teams", isAuth, fantasyTeamsController.getF1Teams);

module.exports = router;
