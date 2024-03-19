const express = require("express");
const router = express.Router();
const SectionController = require("../controllers/section.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.use(authMiddleware.checkIsLogin);
router.get("/", SectionController.getListSection);

// UPDATE
router.get("/detail/:sectionID", SectionController.getListSectionByID);
router.post("/update/:sectionID", SectionController.updateSection);

// ADD
router.get("/addForm", SectionController.addForm);
router.post("/createSection", SectionController.createSection);

// DELETE
router.get("/delete/:sectionID", SectionController.deleteSection);

module.exports = router;
