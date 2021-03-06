const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(
    new User({
      login: req.body.login,
      name: req.body.name,
      password: req.body.password
    })
  );
  // map user fields to exclude secret fields like "password"
  res.json(User.toResponse(user));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  // map user fields to exclude secret fields like "password"
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  // map user fields to exclude secret fields like "password"
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.remove(req.params.id);
  // map user fields to exclude secret fields like "password"
  res.json(user);
});

module.exports = router;
