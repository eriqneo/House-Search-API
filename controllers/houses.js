const getAllHouses = async (req, res) => {
  res.send("Get All Houses");
};

const createHouse = async (req, res) => {
  res.send("Create A Home");
};

const getHouse = async (req, res) => {
  res.send("Get A Single House");
};

const updateHouse = async (req, res) => {
  res.send("Update House Status");
};

const deleteHouse = async (req, res) => {
  res.send("Delete A House");
};

module.exports = {
  getAllHouses,
  createHouse,
  getHouse,
  updateHouse,
  deleteHouse,
};
