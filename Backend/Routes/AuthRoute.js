const { Singup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const { getholdings, getPositions, getorders, newOrder, sellorder, watchlist, getSellOrders, findAccount, newAccount } = require("../Controllers/Dashboarddata");
const { getFunds, addFunds, WithdrawFunds } = require("../Controllers/Fundsdata");

const { createAdmin, loginAdmin, Findusers, fetchOrders } = require("../Controllers/AdminController");
const router = require("express").Router();


router.post("/signup", Singup);
router.post("/login", Login);
router.post("/loginadmin", loginAdmin);

router.get("/allHolding", getholdings);
router.get("/allPosition", getPositions);
router.get("/allOrders", getorders);
router.get("/getSellOrders", getSellOrders);
router.get("/userFunds", getFunds);
router.get("/allUsers", Findusers);
router.get("/fetchOrders", fetchOrders);
router.get("/watchlist", watchlist);
router.get("/accountDetails", findAccount);

router.post("/createAdmin", createAdmin);
router.post("/newOrder", newOrder);
router.post("/sellOrder", sellorder);
router.post("/addFunds", addFunds);
router.post("/withdrawFunds", WithdrawFunds);
router.post('/', userVerification);
router.post("/saveAccountDetails", newAccount);

module.exports = router;