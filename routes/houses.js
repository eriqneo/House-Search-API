const express = require("express");
router = express.Router();

const {
  getAllHouses,
  getHouse,
  createHouse,
  updateHouse,
  deleteHouse,
} = require("../controllers/houses");

router.route("/").get(getAllHouses).post(createHouse);
router.route("/:id").get(getHouse).delete(deleteHouse).patch(updateHouse);

module.exports = router;
