const express = require("express");
const isAuth = require("../middleware/is-auth.js");
const isAdmin = require("../middleware/is-admin.js");
const fantasyLeaguesController = require("../controllers/fantasyLeagues.js");

const router = express.Router();

router.get("/get-all-leagues", isAuth, fantasyLeaguesController.getAllLeagues);

router.get("/get-league/:leagueId", isAuth, fantasyLeaguesController.getLeague);

router.get(
  "/get-joined-leagues",
  isAuth,
  fantasyLeaguesController.getJoinedLeagues
);

router.post("/join-league", isAuth, fantasyLeaguesController.joinLeague);

module.exports = router;
