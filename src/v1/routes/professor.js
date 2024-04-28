const Router = require('express')
const ProfessorController = require('../controllers/professor');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router()

router.post('/', authMiddleware, ProfessorController.create)
router.get('/', ProfessorController.getAll)

module.exports = router;