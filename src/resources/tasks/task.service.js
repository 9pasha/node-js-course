const tasksRepo = require('./task.memory.repository');

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);
const create = (task, boardId) => tasksRepo.create(task, boardId);
const update = (taskId, task) => tasksRepo.update(taskId, task);
const removeTask = (boardId, taskId) => tasksRepo.removeTask(boardId, taskId);

module.exports = { getById, create, removeTask, update };
