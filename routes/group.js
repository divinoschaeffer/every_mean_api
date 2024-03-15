const express = require("express");
const { createGroup, getGroup, deleteGroup } = require("../controllers/group");


const router = express.Router();

router.post('/create', createGroup);
router.get('/:id', getGroup);
router.delete('/delete/:id',deleteGroup);

module.exports = router;