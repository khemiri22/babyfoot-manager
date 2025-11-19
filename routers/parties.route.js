const router = require('express').Router()
const partiesController = require('../controllers/parties.controller');

router.get('/',partiesController.getAllParties)
router.post('/',partiesController.addParty)
router.delete('/:id',partiesController.deleteParty)
router.patch('/:id',partiesController.endParty)

module.exports = router;