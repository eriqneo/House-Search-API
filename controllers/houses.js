const House = require("../models/houses");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllHouses = async (req, res) => {
  const { isOwned } = req.query;
  let houses;
  if (isOwned) {
    houses = await House.find({ createdBy: req.user.userId }).sort("createdAt");
    return res.status(StatusCodes.OK).json({ houses, count: houses.length });
  }
  houses = await House.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ houses, count: houses.length });
};

const createHouse = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const house = await House.create(req.body);
    res.status(StatusCodes.CREATED).json({ house });
  } catch (error) {
    console.log(error);
  }
};

const getHouse = async (req, res) => {
  const {
    user: { userId },
    params: { id: houseId },
  } = req;
  const house = await House.findOne({ _id: houseId, createdBy: userId });
  if (!house) {
    throw new NotFoundError(`No house found with id ${houseId}`);
  }
  res.status(StatusCodes.OK).json({ house });
};

const updateHouse = async (req, res) => {
  const {
    body: { houseSize, houseType, areaIn, price },
    user: { userId },
    params: { id: houseId },
  } = req;

  if (houseSize === "" || houseType === "" || areaIn === "" || price === "") {
    throw new BadRequestError("All fields MUST Be Field");
  }

  const house = await House.findByIdAndUpdate(
    { _id: houseId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!house) {
    throw new NotFoundError(`No House found with Id ${houseId}`);
  }
  res.status(StatusCodes.OK).json({ house });
};

const deleteHouse = async (req, res) => {
  const {
    user: { userId },
    params: { id: houseId },
  } = req;
  const house = await House.findByIdAndRemove({
    _id: houseId,
    createdBy: userId,
  });

  if (!house) {
    throw new NotFoundError(`No House found with id ${houseId}`);
  }
  res.status(StatusCodes.OK).send(`${houseId} has been successfully Deleted`);
};

module.exports = {
  getAllHouses,
  createHouse,
  getHouse,
  updateHouse,
  deleteHouse,
};
