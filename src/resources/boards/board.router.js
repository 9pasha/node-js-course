const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  // map user fields to exclude secret fields like "password"
  res.json(Board.toResponse(board));
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(
    new Board({
      id: req.body.id,
      title: req.body.title,
      columns: req.body.columns
    })
  );
  // map user fields to exclude secret fields like "password"
  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  // map user fields to exclude secret fields like "password"
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  const boards = await boardsService.remove(req.params.id);
  // map user fields to exclude secret fields like "password"
  res.json(boards);
});

module.exports = router;
