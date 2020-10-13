const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getById(req.params.boardId);
  // map user fields to exclude secret fields like "password"
  res.json(tasks);
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const tasks = await tasksService.getById(req.params.boardId, req.params.id);
  // map user fields to exclude secret fields like "password"
  res.json(tasks);
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = await tasksService.create(
    new Task(req.body),
    req.params.boardId
  );
  // map user fields to exclude secret fields like "password"
  res.json(task);
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const task = await tasksService.update(req.params.id, {
    id: req.body.id,
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.body.boardId,
    columnId: req.body.columnId
  });
  // map user fields to exclude secret fields like "password"
  res.json(task);
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const tasks = await tasksService.removeTask(
    req.params.boardId,
    req.params.id
  );
  // map user fields to exclude secret fields like "password"
  res.json(tasks.map(Task.toResponse));
});

module.exports = router;
