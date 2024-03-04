const db = require('../database');

exports.listUsers = async (req, res) => {
    try {
        const [users] = await db.execute('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        res.json({ message: "Error fetching users" });
    }
};

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [result] = await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        res.json({ message: "User created successfully", userId: result.insertId });
    } catch (error) {
        res.json({ message: "Error creating user" });
    }
};

exports.getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
        if (user.length > 0) {
            res.json(user[0]);
        } else {
            res.json({ message: "User not found" });
        }
    } catch (error) {
        res.json({ message: "Error fetching user" });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    try {
        await db.execute('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, password, userId]);
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.json({ message: "Error updating user" });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await db.execute('DELETE FROM users WHERE id = ?', [userId]);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.json({ message: "Error deleting user" });
    }
};
