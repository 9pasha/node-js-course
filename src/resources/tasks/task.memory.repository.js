const DB = require('../../common/inMemory');

const getById = async (boardId, taskId) => DB.getTasksById(boardId, taskId);
const create = async (task, boardId) => DB.createTask(task, boardId);
const update = async (taskId, task) => DB.updateTask(taskId, task);
const removeTask = async (boardId, taskId) => DB.removeTask(boardId, taskId);

module.exports = { getById, create, removeTask, update };
