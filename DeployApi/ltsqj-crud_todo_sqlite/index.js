const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// Initialize the Express app and middleware
const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors()); // enable CORS

// Set up SQLite database
const db = new sqlite3.Database(':memory:'); // In-memory database for demo purposes

// Create the to-do table
db.serialize(() => {
  db.run(`CREATE TABLE todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0
  )`);
});

// API Endpoints

// Create a new to-do item
app.post('/todos', (req, res) => {
  const { title } = req.body;
  db.run('INSERT INTO todo (title) VALUES (?)', [title], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, completed: 0 });
  });
});

// Read all to-do items
app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todo', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Read a specific to-do item by ID
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM todo WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'To-do item not found' });
    }
    res.json(row);
  });
});

// Update a to-do item by ID
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  db.run(
    'UPDATE todo SET title = ?, completed = ? WHERE id = ?',
    [title, completed, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'To-do item not found' });
      }
      res.json({ id, title, completed });
    }
  );
});

// Delete a to-do item by ID
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM todo WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'To-do item not found' });
    }
    res.status(204).end();
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
