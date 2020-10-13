const DB = require('../../common/inMemory');

const getAll = async () => DB.getAllUsers();
const getById = async id => {
  const user = DB.getById(id);

  if (!user) {
    throw new Error(`The user with id = ${id} was not found!`);
  }

  return user;
};
const create = async user => {
  return DB.createUser(user);
};
const update = async (id, user) => {
  return DB.updateUser(id, user);
};
const remove = async id => {
  return DB.removeUser(id);
};

module.exports = { getAll, getById, create, update, remove };
