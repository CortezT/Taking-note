const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const notes = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const notes = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const newNote = req.body;

    notes.push(newNote);
    fs.writeFileSync(dbPath, JSON.stringify(notes));
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const notes = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const noteIdToDelete = req.params.id;

    fs.writeFileSync(dbPath, JSON.stringify(notes));
    res.json({ message: 'Note deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});