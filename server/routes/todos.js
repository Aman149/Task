const express = require('express');
const mongoose = require('mongoose');
const { Todo } = require('../db');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateJwt);

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// List all todos for current user
router.get('/', async (req, res) => {
  const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ todos });
});

// Get a single todo
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ msg: 'Invalid id' });
  const todo = await Todo.findOne({ _id: id, user: req.user.id });
  if (!todo) return res.status(404).json({ msg: 'Todo not found' });
  res.json({ todo });
});

// Create
router.post('/', async (req, res) => {
  const { title, description } = req.body || {};
  if (!title || !title.trim()) {
    return res.status(400).json({ msg: 'Title is required' });
  }
  const todo = await Todo.create({
    user: req.user.id,
    title: title.trim(),
    description: (description || '').trim(),
  });
  res.status(201).json({ message: 'Todo created', todo });
});

// Update
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ msg: 'Invalid id' });
  const { title, description, completed } = req.body || {};
  const update = {};
  if (title !== undefined) update.title = String(title).trim();
  if (description !== undefined) update.description = String(description).trim();
  if (completed !== undefined) update.completed = Boolean(completed);
  if (update.title === '') return res.status(400).json({ msg: 'Title cannot be empty' });
  const todo = await Todo.findOneAndUpdate(
    { _id: id, user: req.user.id },
    update,
    { new: true }
  );
  if (!todo) return res.status(404).json({ msg: 'Todo not found' });
  res.json({ message: 'Todo updated', todo });
});

// Delete
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ msg: 'Invalid id' });
  const result = await Todo.findOneAndDelete({ _id: id, user: req.user.id });
  if (!result) return res.status(404).json({ msg: 'Todo not found' });
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
