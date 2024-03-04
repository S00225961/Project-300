const express = require('express');
const router = express.Router();
const commuteController = require('../controllers/commuteController');

router.get('/', commuteController.listCommutes);
router.post('/', commuteController.createCommute);
router.get('/:id', commuteController.getCommute);
router.put('/:id', commuteController.updateCommute);
router.delete('/:id', commuteController.deleteCommute);

module.exports = router;
