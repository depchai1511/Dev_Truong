const userRouter = require('./user')
const authRouter = require('./auth')
const paymentRouter =  require('./payment')
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/auth', authRouter)
    app.use('/pay',  paymentRouter)
    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes