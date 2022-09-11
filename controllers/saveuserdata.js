import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saveUserData = async (req, res) => {
  const { name, email, password, password_Confirmation } = req.body;
  const checkEmail = await user.findOne({ email: email });
  if (checkEmail) {
    res.send({ status: "failed", message: "Email Already Exist" });
  } else {
    if (name && email && password && password_Confirmation) {
      if (password === password_Confirmation) {
        try {
          const salt = await bcrypt.genSalt(12);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new user({
            name: name,
            email: email,
            password: hashPassword,
          });
          await doc.save();
          const savedUser = await user.findOne({ email: email });
          // Generating JWT Token
          const token = jwt.sign(
            { userID: savedUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "365d" }
          );
          res.status(201).send({
            staus: "Success",
            message: "User Registerd Sucessfully",
            token: token,
          });
        } catch (error) {
          console.log(error);
          res.send({
            status: "failed",
            message: "unable to register",
          });
        }
      } else {
        res.send({
          status: "falied",
          message: "password and confirm password doesn't match",
        });
      }
    } else {
      res.send({ status: "failed", message: "All feilds are mandatory" });
    }
  }
};

export default saveUserData;
