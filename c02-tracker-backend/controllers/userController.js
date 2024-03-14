const db = require('../database');

exports.listUsers = async (req, res) => {
    try {
        const users = await db.query("SELECT * FROM users", { type: db.QueryTypes.SELECT });
        res.json(users);
    } catch (err) {
        res.send({ message: "Error retrieving users" });
    }
};

exports.createUser = async (req, res) => {
    const { username, email, password, givenName, familyName } = req.body; 
    try {
        const result = await db.query('INSERT INTO UserProfiles (username, email, passwordHash, firstName, lastName) VALUES (?, ?, ?, ?, ?)', 
            [username, email, password , givenName, familyName]);
        res.json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        res.send({ message: 'Error creating user' });
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
        res.send({ message: "Error retrieving user" });
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
        res.send({ message: "Error updating user" });
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
        res.send({ message: "Error deleting user" });
    }
};
