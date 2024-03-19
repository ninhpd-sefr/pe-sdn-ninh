const express = require("express");
const router = express.Router();

router.use("/", require("./authen.route"));

router.use("/course", require("./course.route"));

router.use("/section", require("./section.route"));

// router.use('/sess')

router.get("/", (req, res) => [res.redirect("/login")]);

module.exports = router;
