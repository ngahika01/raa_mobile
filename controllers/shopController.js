import Shop from "../models/shopModel.js";
import asyncHandler from "express-async-handler";

// Get all shops
const getShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find();
  res.status(200).json(shops);
});

// Get single shop
const getShop = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);
  if (shop) {
    res.json(shop);
  } else {
    res.status(404);
    throw new Error("Shop not found");
  }
});

// Create shop
const createShop = asyncHandler(async (req, res) => {
  const { name, services, location, image, phoneNumber } = req.body;
  const shop = await Shop.findOne({ name });
  if (shop) {
    res.status(400);
    throw new Error("Shop already exists");
  }
  const newShop = await Shop.create({
    name,
    services,
    location,
    image,
    phoneNumber,
    user: req.user,
  });
  res.status(201).json(newShop);
});

// Update shop
const updateShop = asyncHandler(async (req, res) => {
  const shop = await ShopfindById(req.params.id);
  if (shop) {
    shop.name = req.body.name || shop.name;
    shop.services = req.body.services || shop.services;
    shop.location = req.body.location || shop.location;
    shop.image = req.body.image || shop.image;
    shop.phoneNumber = req.body.phoneNumber || shop.phoneNumber;
    const updatedShop = await shop.save();
    res.json(updateShop);
  } else {
    res.status(404);
    throw new Error("Shop not found");
  }
});

// Delete shop
const deleteShop = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);
  if (shop) {
    await shop.remove();
    res.status(204);
  } else {
    res.status(404);
    throw new Error("Shop not found");
  }
});
// get logged in user shops
const getUserShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({ user: req.user._id });
  res.status(200).json(shops);
});

export { getShops, getShop, createShop, updateShop, deleteShop, getUserShops };
