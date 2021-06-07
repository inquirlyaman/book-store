"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const _ = __importStar(require("lodash"));
const bcrypt = __importStar(require("bcryptjs"));
const user_1 = require("../models/user");
const utilService_1 = require("../share/utilService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../env");
const responseUtil = new utilService_1.ResponseUtil();
class UserService {
    addUser(req, res) {
        if (_.isEmpty(req.body.email)) {
            const data = {
                error: 'Bad request',
                errMsg: 'Please enter a valid email',
                errorCode: 400
            };
            responseUtil.getErrorResponse(res, data);
        }
        else {
            user_1.User.findOne({ email: req.body.email }, (err, user) => {
                if (user) {
                    const data = {
                        error: err,
                        errMsg: 'User already exits',
                        errorCode: 409
                    };
                    responseUtil.getErrorResponse(res, data);
                }
                else {
                    const user = new user_1.User({
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10)
                    });
                    user.save((err, user) => {
                        if (err) {
                            res.send(err);
                        }
                        const data = {
                            title: 'User creattion',
                            sucessMsg: 'User created successfully',
                            statusCode: 200
                        };
                        responseUtil.successResponse(res, data);
                    });
                }
            });
        }
    }
    getUser(req, res) {
        user_1.User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                const data = {
                    error: 'An error occurred',
                    errMsg: 'Internal server error',
                    errorCode: 500
                };
                responseUtil.getErrorResponse(res, data);
            }
            if (user) {
                if (_.isEmpty(req.body.password)) {
                    const data = {
                        error: 'Bad request',
                        errMsg: 'Please enter a valid password',
                        errorCode: 400
                    };
                    responseUtil.getErrorResponse(res, data);
                }
                else {
                    const isMatch = bcrypt.compareSync(req.body.password, user.password);
                    if (isMatch) {
                        const token = jsonwebtoken_1.default.sign({
                            email: user.email,
                            userId: user._id.toString(),
                            roles: user.roles
                        }, env_1.CONSTANTS.SECRET_KEY, { expiresIn: '1h' });
                        const data = {
                            title: 'User login ',
                            sucessMsg: 'Successfully logged in',
                            statusCode: 200,
                            token: token
                        };
                        responseUtil.successResponse(res, data);
                    }
                    else {
                        const data = {
                            error: 'Bad request',
                            errMsg: 'Incorrect Password',
                            errorCode: 400
                        };
                        responseUtil.getErrorResponse(res, data);
                    }
                }
            }
            else {
                const data = {
                    error: 'Login failed',
                    errMsg: 'Invalid login credentials',
                    errorCode: 401
                };
                responseUtil.getErrorResponse(res, data);
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map