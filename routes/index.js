const userRouter = require('./user')
const authRouter = require('./auth')
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/auth', authRouter)
    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes