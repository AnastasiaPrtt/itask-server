const Router = require('express')
const groupController = require('../controllers/group');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router()

router.post('/', authMiddleware, groupController.create)
router.get('/', authMiddleware, groupController.getAll)

module.exports = router;