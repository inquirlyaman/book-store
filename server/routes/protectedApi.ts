import express from 'express'
import { isAdmin } from '../middlewares/isAuth';
import { manageBookRouter } from './manageBook';
import { userRouter } from './userRoute';
export const protectedApi = express.Router()
protectedApi.use('/book', manageBookRouter)
protectedApi.use('/user', isAdmin, userRouter)