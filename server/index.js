const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the "public" directory (adjust path)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// In-memory data storage (for demo purposes only)
let data = [];

// CRUD API Routes
app.get('/data', (req, res) => {
    res.json(data);
});

app.post('/data', (req, res) => {
    const newEntry = req.body;
    data.push(newEntry);
    res.status(201).json(newEntry);
});

app.put('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < data.length) {
        data[id] = req.body;
        res.json(data[id]);
    } else {
        res.status(404).json({ error: 'Entry not found' });
    }
});

app.delete('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < data.length) {
        data.splice(id, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Entry not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
