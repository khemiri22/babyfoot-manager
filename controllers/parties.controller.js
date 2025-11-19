const db = require("../utilities/db");
const socket = require("../utilities/socket");

// Get all parties
const getAllParties = async (req, res, next) => {
  try {
    let count = 0;
    const data = await db.query("SELECT * FROM parties");
    data.rows.forEach(party => {
      if (!party.terminated) count++;
    });
    parties = {
        list : data.rows,
        count : count
    }
    res.status(200).render("index", {
      parties
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add a new party
const addParty = async (req, res, next) => {
  const party_name = req.body.party_name;
  try {
    const result = await db.query(
      "INSERT INTO parties (name) VALUES ($1) RETURNING *",
      [party_name]
    );

    // Emit event for the added party
    socket.getIO().emit("addedParty", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a party
const deleteParty = async (req, res, next) => {
  const partyId = req.params.id;
  try {
    const result = await db.query(
      "DELETE FROM parties WHERE id = $1 RETURNING *",
      [partyId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Party not found" });
    }

    // Emit event for the deleted party
    socket.getIO().emit("deletedParty", partyId);
    res.status(200).json({ message: "Party deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

// End a party
const endParty = async (req, res, next) => {
  const partyId = req.params.id;
  try {
    const result = await db.query(
      "UPDATE parties SET terminated = $1 WHERE id = $2 RETURNING *",
      [true, partyId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Party not found" });
    }

    // Emit event for the ended party
    socket.getIO().emit("endedParty", partyId);
    res.status(200).json({ message: "Party ended successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllParties,
  addParty,
  deleteParty,
  endParty,
};
