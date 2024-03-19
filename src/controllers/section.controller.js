"use strict";
const courseModel = require("../models/course.model");
const sectionModel = require("../models/section.model");

class SecctionController {
  getListSection = async (req, res) => {
    try {
      const sectionList = await sectionModel.find().populate("course");
      //   res.status(200).json(sectionList);
      res.render("dashboard", {
        sectionList: sectionList,
      });
    } catch (error) {
      console.log(error);
      res.render("error", {
        message: error.message,
      });
    }
  };

  getListSectionByID = async (req, res) => {
    try {
      const sectionID = req.params.sectionID;
      const sectionDetail = await sectionModel.findById(sectionID);
      const courses = await courseModel.find();
      res.render("sectionUpdate", {
        sectionDetail: sectionDetail,
        courses: courses,
      });
      //   return res.status(200).json(sectionDetail);
    } catch (error) {
      console.log(error);
      res.render("error", {
        message: error.message,
      });
    }
  };

  addForm = async (req, res) => {
    try {
      const courses = await courseModel.find();
      res.render(`sectionAdd`, {
        courses: courses,
      });
    } catch (error) {
      console.log(error);
      res.render("error", {
        message: error.message,
      });
    }
  };

  createSection = async (req, res) => {
    try {
      // Lấy thông tin từ request body
      const {
        sectionName,
        sectionDescription,
        duration,
        isMainTask,
        courseId,
      } = req.body;

      let newMainTask = false;
      console.log(isMainTask.length);
      if (Array.isArray(isMainTask)) {
        newMainTask = true;
      }

      // Tạo một section mới
      const newSection = new sectionModel({
        sectionName: sectionName,
        sectionDescription: sectionDescription,
        duration: duration,
        isMainTask: newMainTask,
        course: courseId,
      });

      // Lưu section mới vào cơ sở dữ liệu
      const savedSection = await newSection.save();

      // Trả về kết quả
      res.redirect("/section");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  updateSection = async (req, res) => {
    try {
      const sectionID = req.params.sectionID;
      const data = req.body;
      if (!data.isMainTask) {
        data.isMainTask = false;
      }
      await sectionModel.findByIdAndUpdate(sectionID, data);
      res.redirect("/section");
    } catch (error) {
      console.log(error);
      res.render("error", {
        message: error.message,
      });
    }
  };

  deleteSection = async (req, res) => {
    try {
      const sectionID = req.params.sectionID;
      console.log("delete: " + sectionID);
      await sectionModel.findByIdAndDelete(sectionID);
      res.redirect(`/section`);
    } catch (error) {
      console.log(error);
      res.render("error", {
        message: error.message,
      });
    }
  };
}

module.exports = new SecctionController();
