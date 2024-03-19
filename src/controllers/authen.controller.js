"use strict";
const memmberModel = require("../models/member.model");
const bcrypt = require("bcrypt");
const jwt = require("../helper/jwt.helper");

class AuthenController {
  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const isMemberExist = await memmberModel.findOne({
        username: username,
      });
      if (!isMemberExist) {
        throw new Error("User not found");
      }
      const isPasswordMatch = await bcrypt.compare(
        password,
        isMemberExist.password
      );
      if (!isPasswordMatch) {
        throw new Error("Password not match");
      }
      let payload = {
        username: isMemberExist.username,
      };
      const token = await jwt.generateToken(payload);
      req.session.token = token;
      res.redirect("/section");
    } catch (error) {
      console.log(error);
      res.render("error", {
        message: error.message,
      });
    }
  };

  register = async (req, res) => {
    try {
      const { username, password } = req.body;
      const isUseNameExist = await memmberModel.findOne({
        username: username,
      });
      if (isUseNameExist) {
        throw new Error("Username is exist");
      }
      const hashPassword = await bcrypt.hash(password, 8);
      await memmberModel.create({
        username: username,
        password: hashPassword,
      });
      res.redirect("/login");
    } catch (error) {
      res.render("error", {
        message: error.message,
      });
    }
  };
}

module.exports = new AuthenController();
