const DB = require('../../common/inMemory');

const getAll = async () => DB.getAllBoards();
const getById = async id => DB.getBoardById(id);
const create = async board => DB.createBoard(board);
const update = async (id, board) => DB.updateBoard(id, board);
const remove = async id => DB.removeBoard(id);

module.exports = { getAll, getById, create, update, remove };
