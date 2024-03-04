const db = require('../database');

exports.listUsers = async (req, res) => {
    try {
        const users = await db.query("SELECT * FROM users", { type: db.QueryTypes.SELECT });
        res.json(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body; 
    try {
        const newUser = await db.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
            { 
                replacements: [username, email, password], 
                type: db.QueryTypes.INSERT 
            }
        );
        res.status(201).send({ message: "User created successfully", user: newUser });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.query("SELECT * FROM users WHERE id = ?", { 
            replacements: [id], 
            type: db.QueryTypes.SELECT 
        });
        res.json(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body; 
    try {
        await db.query(
            "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?", 
            {
                replacements: [username, email, password, id],
                type: db.QueryTypes.UPDATE
            }
        );
        res.send({ message: "User updated successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM users WHERE id = ?", { 
            replacements: [id], 
            type: db.QueryTypes.DELETE 
        });
        res.send({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
