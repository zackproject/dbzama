const express = require('express');
const { createClient } = require('@libsql/client');

const router = express.Router();

const turso = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

// Get all characters
router.get('/', async (req, res) => {
    try {
        const result = await turso.execute("SELECT * FROM Character");
        res.json(result.rows);
    } catch (error) {
        console.error("Database query error:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Get a specific character by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await turso.execute({
            sql: "SELECT * FROM Character WHERE id = :nid",
            args: { nid: req.params.id },
        });
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Character not found" });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error("Database query error:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Create a new character
router.post('/post', async (req, res) => {
    try {
        const { name, image, serie } = req.body;
        const result = await turso.execute({
            sql: "insert into Character(name, image, serie) values (:name, :image, :serie)",
            args: { name: name, image: image, serie: serie },
        });

        res.status(201).json({ id: result.insertId, name, image });
    } catch (error) {
        console.error("Database insert error:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Update an existing character
router.put('/modify/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, serie } = req.body;

        // Validar que los campos no están undefined
        if (typeof name === 'undefined' || typeof image === 'undefined' || typeof serie === 'undefined') {
            return res.status(400).send("Bad Request: Missing required fields");
        }

        const result = await turso.execute({
            sql: "UPDATE Character SET name = :name, image = :image, serie = :serie WHERE id = :id",
            args: { id: id, name: name, image: image, serie: serie },
        });

        console.log("Database update result:", result);
        res.status(200).send(result);
    } catch (error) {
        console.error("Database update error:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Delete a character
router.delete('/delete/:id', async (req, res) => {
    try {
        await turso.execute({
            sql: "DELETE FROM Character WHERE id = :nid",
            args: { nid: req.params.id },
        });
        if (result.affectedRows === 0) {
            res.status(404).send("Character not found");
        } else {
            res.status(200).send("Character deleted successfully");
        }
    } catch (error) {
        console.error("Database delete error:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;