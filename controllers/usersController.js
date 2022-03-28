import User from "../models/usersModel.js";
import express from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// Get all users
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Get single user
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Create user
const createUser = asyncHandler(async (req, res, next) => {
  const { name, role, password, phoneNumber } = req.body;

  const user = await User.findOne({ name });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }
  const newUser = await User.create({ name, role, password, phoneNumber });

  res.status(201).json({
    name: newUser.name,
    role: newUser.role,
    _id: newUser._id,
    phoneNumber: newUser.phoneNumber,
    token: generateToken(newUser._id),
  });
});

//@desc auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      role: user.role,
      phoneNumber: user.phoneNumber,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Update user
const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.role = req.body.role || user.role;
    user.password = req.body.password || user.password;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// // Delete user
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, getUsers, getUser, createUser, updateUser, deleteUser };
