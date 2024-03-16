const express = require("express");
const { createGroup, getGroup, deleteGroup, editGroup, addMark, deleteMark } = require("../controllers/group");
const checkAuthToken = require("../middlewares/checkAuthToken");


const router = express.Router();

router.post('/create', createGroup);
router.get('/:id', checkAuthToken, getGroup);
router.delete('/delete/:id', checkAuthToken, deleteGroup);
router.put('/edit/:id', checkAuthToken , editGroup);
router.put('/add-mark/:id', checkAuthToken, addMark);
router.delete('/mark/delete/:id', checkAuthToken, deleteMark);

module.exports = router;