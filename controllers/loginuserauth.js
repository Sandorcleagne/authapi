import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const loginapi = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const checkUserEmail = await user.findOne({ email: email });
      if (checkUserEmail != null) {
        const checkUserPassword = await bcrypt.compare(
          password,
          checkUserEmail.password
        );
        if (checkUserEmail.email === email && checkUserPassword) {
          const token = jwt.sign(
            { userID: checkUserEmail._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "365d" }
          );
          res
            .status(201)
            .send({ status: "success", message: "Logged In Successfully" });
        } else {
          res
            .status(401)
            .send({ status: "failed", message: "Credentials does't match" });
        }
      } else {
        res
          .status(401)
          .send({ status: "failed", message: "User Doesn't Exist" });
      }
    } else {
      res
        .status(401)
        .send({ status: "failed", message: "All Feilds are mandatory" });
    }
  } catch (error) {
    console.log(error);
    res.send("Unable To Login");
  }
};

export default loginapi;
