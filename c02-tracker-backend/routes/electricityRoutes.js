const express = require('express');
const router = express.Router();
const { listElectricityRecords, createElectricityRecord, getElectricityRecord, updateElectricityRecord, deleteElectricityRecord } = require('../controllers/electricityController');

router.get('/', listElectricityRecords);
router.post('/', createElectricityRecord);
router.get('/:id', getElectricityRecord);
router.put('/:id', updateElectricityRecord);
router.delete('/:id', deleteElectricityRecord);


module.exports = router;
