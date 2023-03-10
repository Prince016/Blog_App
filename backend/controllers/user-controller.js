import User from "../model/User";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(400).json({ msg: "Users not found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }

  if (existingUser) {
    return res.status(400).json({ msg: "User already Exist!!..." });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs:[],
  });
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ user });
};



export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {

    existingUser = await User.findOne({ email });

  } catch (err) {
    console.log(err);
  }


  if (!existingUser) {
    return res.status(404).json({ msg: "Email is wrong !!!...." })
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!existingUser) {
    return res.status(404).json({ msg: "password is wrong !!!...." })
  }
  return res.status(200).json({msg:"Login Successfully!!!...", user:existingUser});

}

