import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';
import { Request as req, Response as res } from "express";
import { User } from '../models/user';
import {ResponseUtil} from '../share/utilService';
const responseUtil = new ResponseUtil();
export class UserService {
    addUser(req:req,res:res) {
        if (_.isEmpty(req.body.email)) {
          const data = {
            error: 'Bad request',
            errMsg: 'Please enter a valid email',
            errorCode:400
          }
          responseUtil.getErrorResponse(res,data);
        } else {
            User.findOne({email:req.body.email},(err,user)=>{
                if(user){
                  const data = {
                    error: err,
                    errMsg: 'User already exits',
                    errorCode:409
                  }
                  responseUtil.getErrorResponse(res,data);
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
                          title: 'User exits',
                          sucessMsg: 'User created successfully',
                          statusCode:200
                        }
                      responseUtil.successResponse(res,data);
                    })
                }
            })
            
        }
    }
    getUser(req:req,res:res) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (user) {
                if (_.isEmpty(req.body.password)) {
                    return res.status(400).json({
                        title: 'Bad request ',
                        error: { message: 'Please enter a valid password' }
                    })
                } else {
                    const isMatch = bcrypt.compareSync(req.body.password, user.password);
                    if (isMatch) {
                        return res.status(200).json({
                            message: 'Successfully logged in',
                            user: user
                        })
                    } else {
                        return res.status(400).json({
                            title: 'Bad request ',
                            error: { message: 'Incorrect Password' }
                        })
                    }
                }
            } else {
                return res.status(401).json({
                    title: 'Login failed',
                    error: { message: 'Invalid login credentials' }
                })
            }

        })
    }
}