const express = require("express");
const { createGroup, getGroup, deleteGroup, editGroup, addMark, deleteMark } = require("../controllers/group");


const router = express.Router();

router.post('/create', createGroup);
router.get('/:id', getGroup);
router.delete('/delete/:id',deleteGroup);
router.put('/edit/:id', editGroup);
router.put('/add-mark/:id', addMark);
router.delete('/mark/delete/:id', deleteMark);

module.exports = router;