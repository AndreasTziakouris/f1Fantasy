const express = require("express");
const isAuth = require("../middleware/is-auth.js");
const isAdmin = require("../middleware/is-admin.js");
const fantasyLeaguesController = require("../controllers/fantasyLeagues.js");

const router = express.Router();

router.put("/update-league", isAuth, fantasyLeaguesController.getAllLeagues);
