import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';
import { Request as req, Response as res } from "express";
import { User } from '../models/user';
import { ResponseUtil } from '../share/utilService';
const responseUtil = new ResponseUtil();
export class UserService {
    addUser(req: req, res: res) {
        if (_.isEmpty(req.body.email)) {
            const data = {
                error: 'Bad request',
                errMsg: 'Please enter a valid email',
                errorCode: 400
            }
            responseUtil.getErrorResponse(res, data);
        } else {
            User.findOne({ email: req.body.email }, (err, user) => {
                if (user) {
                    const data = {
                        error: err,
                        errMsg: 'User already exits',
                        errorCode: 409
                    }
                    responseUtil.getErrorResponse(res, data);
                } else {
                    const user = new User({
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10)
                    })
                    user.save((err, user) => {
                        if (err) {
                            res.send(err)
                        }
                        const data = {
                            title: 'User creattion',
                            sucessMsg: 'User created successfully',
                            statusCode: 200
                        }
                        responseUtil.successResponse(res, data);
                    })
                }
            })

        }
    }
    getUser(req: req, res: res) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                const data = {
                    error: 'An error occurred',
                    errMsg: 'Internal server error',
                    errorCode: 500
                }
                responseUtil.getErrorResponse(res, data);
            }
            if (user) {
                if (_.isEmpty(req.body.password)) {
                    const data = {
                        error: 'Bad request',
                        errMsg: 'Please enter a valid password',
                        errorCode: 400
                    }
                    responseUtil.getErrorResponse(res, data);
                } else {
                    const isMatch = bcrypt.compareSync(req.body.password, user.password);
                    if (isMatch) {
                        const data = {
                            title: 'User login ',
                            sucessMsg: 'Successfully logged in',
                            statusCode: 200,
                            user: user
                        }
                        responseUtil.successResponse(res, data);
                    } else {
                        const data = {
                            error: 'Bad request',
                            errMsg: 'Incorrect Password',
                            errorCode: 400
                        }
                        responseUtil.getErrorResponse(res, data);
                    }
                }
            } else {
                const data = {
                    error: 'Login failed',
                    errMsg: 'Invalid login credentials',
                    errorCode: 401
                }
                responseUtil.getErrorResponse(res, data);
            }

        })
    }
}