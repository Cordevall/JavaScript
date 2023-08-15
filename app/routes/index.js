const { Router } = require("express")
const authRouter = '../auth';

const router = Router()
router.use('/auth', authRouter)

export default router;