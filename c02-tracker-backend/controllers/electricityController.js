const db = require('../database');

exports.listElectricityRecords = async (req, res) => {
    try {
        const records = await db.query("SELECT * FROM electricity_usage", { type: db.QueryTypes.SELECT });
        res.json(records);
    } catch (err) {
        res.json({ message: "Error fetching electricity records" });
    }
};

exports.createElectricityRecord = async (req, res) => {
    const { userID, usageInKwh, source, co2Emissions } = req.body;
    try {
        const newRecord = await db.query(
            "INSERT INTO electricity_usage (userID, usageInKwh, source, co2Emissions) VALUES (?, ?, ?, ?)", 
            { 
                replacements: [userID, usageInKwh, source, co2Emissions],
                type: db.QueryTypes.INSERT 
            }
        );
        res.json({ message: "Electricity usage record created successfully", record: newRecord });
    } catch (err) {
        res.json({ message: "Error creating electricity record" });
    }
};

exports.getElectricityRecord = async (req, res) => {
    const { id } = req.params;
    try {
        const record = await db.query("SELECT * FROM electricity_usage WHERE id = ?", { replacements: [id], type: db.QueryTypes.SELECT });
        if (record.length > 0) {
            res.json(record[0]);
        } else {
            res.json({ message: "Electricity record not found" });
        }
    } catch (err) {
        res.json({ message: "Error fetching electricity record" });
    }
};

exports.updateElectricityRecord = async (req, res) => {
    const { id } = req.params;
    const { userID, usageInKwh, source, co2Emissions } = req.body;
    try {
        await db.query(
            "UPDATE electricity_usage SET userID = ?, usageInKwh = ?, source = ?, co2Emissions = ? WHERE id = ?", 
            {
                replacements: [userID, usageInKwh, source, co2Emissions, id],
                type: db.QueryTypes.UPDATE
            }
        );
        res.json({ message: "Electricity record updated successfully" });
    } catch (err) {
        res.json({ message: "Error updating electricity record" });
    }
};

exports.deleteElectricityRecord = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM electricity_usage WHERE id = ?", { replacements: [id], type: db.QueryTypes.DELETE });
        res.json({ message: "Electricity record deleted successfully" });
    } catch (err) {
        res.json({ message: "Error deleting electricity record" });
    }
};
