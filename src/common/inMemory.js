const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

let DB = [];
let DB_BOARDS = [];
let DB_TASKS = [];

// USERS
const getAllUsers = async () => {
  return DB.slice(0);
};
const getById = async id => DB.filter(el => el.id === id)[0];
const createUser = async user => {
  DB.push(user);
  return user;
};
const updateUser = async (id, user) => {
  DB.forEach(el => {
    if (el.id === id) {
      if (user.name) {
        el.name = user.name;
      }
      if (user.login) {
        el.login = user.login;
      }
      if (user.password) {
        el.password = user.password;
      }
    }
  });

  return getById(id);
};
const removeUser = async id => {
  const removeTasks = async userId => {
    DB_TASKS.forEach(task => {
      if (task.userId === userId) {
        task.userId = null;
      }
    });
  };
  DB = DB.filter(el => {
    return el.id !== id;
  });
  await removeTasks(id);
  return DB_TASKS.slice(0);
};
// BOARDS
const getAllBoards = async () => {
  return DB_BOARDS.slice(0);
};
const getBoardById = async id => {
  return DB_BOARDS.filter(el => el.id === id)[0];
};
const createBoard = async board => {
  DB_BOARDS.push(board);
  return board;
};
const updateBoard = async (id, board) => {
  DB_BOARDS.forEach(el => {
    if (el.id === id) {
      if (board.id) {
        el.id = board.id;
      }
      if (board.title) {
        el.title = board.title;
      }
      if (board.columns) {
        el.columns = board.columns;
      }
    }
  });

  return getBoardById(id);
};
const removeBoard = async id => {
  DB_BOARDS = DB_BOARDS.filter(el => {
    return el.id !== id;
  });
  const removeTasks = async boardId => {
    DB_TASKS = DB_TASKS.filter(task => {
      return task.boardId !== boardId;
    });
  };
  await removeTasks(id);
  return DB_TASKS.slice(0);
};
// TASKS
const getTasksById = async (boardId, taskId) => {
  const boards = getAllBoards(boardId);
  (await boards).forEach(board => {
    board.columns.forEach(task => {
      DB_TASKS.push(task);
    });
  });
  if (!taskId) return DB_TASKS.slice(0);
  return DB_TASKS.slice(0).filter(task => {
    return task.id === taskId;
  })[0];
};
const createTask = async (task, boardId) => {
  DB_TASKS.push((task.boardId = boardId));
  return task;
};
const updateTask = async (taskId, task) => {
  let oldTask = null;
  DB_TASKS.forEach(taskEl => {
    if (taskEl.id === taskId) {
      oldTask = taskEl;
    }
  });
  DB_TASKS[DB_TASKS.indexOf(oldTask)] = { ...task };

  return DB_TASKS.filter(taskItm => {
    return taskItm !== taskId;
  })[0];
};
const removeTask = async (boardId, id) => {
  DB_TASKS = DB_TASKS.filter(task => {
    return task.boardId !== boardId && task.id !== id;
  });
  return DB_TASKS.slice(0);
};

DB.push(new User(), new User());
DB_BOARDS.push(new Board(), new Board(), new Board());
DB_TASKS.push(new Task(), new Task());

module.exports = {
  getAllUsers,
  getById,
  createUser,
  updateUser,
  removeUser,
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  removeBoard,
  getTasksById,
  createTask,
  updateTask,
  removeTask
};
