const db = require('../database');

exports.listCommutes = async (req, res) => {
    try {
        const commutes = await db.query("SELECT * FROM commutes", { type: db.QueryTypes.SELECT });
        res.json(commutes);
    } catch (err) {
        res.json({ message: "Error fetching commutes" });
    }
};

exports.createCommute = async (req, res) => {
    const { userID, distance, modeOfTransport, frequency, timeTaken, co2Emissions } = req.body;
    try {
        const newCommute = await db.query(
            "INSERT INTO commutes (userID, distance, modeOfTransport, frequency, timeTaken, co2Emissions) VALUES (?, ?, ?, ?, ?, ?)", 
            { 
                replacements: [userID, distance, modeOfTransport, frequency, timeTaken, co2Emissions],
                type: db.QueryTypes.INSERT 
            }
        );
        res.json({ message: "Commute entry created successfully", commute: newCommute });
    } catch (err) {
        res.json({ message: "Error creating commute entry" });
    }
};

exports.getCommute = async (req, res) => {
    const { id } = req.params;
    try {
        const commute = await db.query("SELECT * FROM commutes WHERE id = ?", { replacements: [id], type: db.QueryTypes.SELECT });
        if (commute.length > 0) {
            res.json(commute[0]);
        } else {
            res.json({ message: "Commute not found" });
        }
    } catch (err) {
        res.json({ message: "Error fetching commute" });
    }
};

exports.updateCommute = async (req, res) => {
    const { id } = req.params;
    const { userID, distance, modeOfTransport, frequency, timeTaken, co2Emissions } = req.body;
    try {
        await db.query(
            "UPDATE commutes SET userID = ?, distance = ?, modeOfTransport = ?, frequency = ?, timeTaken = ?, co2Emissions = ? WHERE id = ?", 
            {
                replacements: [userID, distance, modeOfTransport, frequency, timeTaken, co2Emissions, id],
                type: db.QueryTypes.UPDATE
            }
        );
        res.json({ message: "Commute updated successfully" });
    } catch (err) {
        res.json({ message: "Error updating commute" });
    }
};

exports.deleteCommute = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM commutes WHERE id = ?", { replacements: [id], type: db.QueryTypes.DELETE });
        res.json({ message: "Commute deleted successfully" });
    } catch (err) {
        res.json({ message: "Error deleting commute" });
    }
};
