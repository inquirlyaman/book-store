"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCustomer = exports.isAdmin = exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../env");
// export class IsAuth { 
function isAuth(req, res, next) {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, env_1.CONSTANTS.SECRET_KEY);
        console.log('decodedToken', decodedToken);
    }
    catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        // error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    req.userRoles = decodedToken.roles;
    req.userEmail = decodedToken.email;
    console.log('req.userId: ', req.userId);
    next();
}
exports.isAuth = isAuth;
function isAdmin(req, res, next) {
    if (req.userRoles.length && !req.userRoles.includes('admin')) {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // authentication and authorization successful
    console.log('req.user: ', req.userId, ':: roles: ', req.userRoles);
    next();
}
exports.isAdmin = isAdmin;
function isCustomer(req, res, next) {
    if (req.userRoles.length && !req.userRoles.includes('customer')) {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // authentication and authorization successful
    console.log('req.user: ', req.userId, ':: roles: ', req.userRoles);
    next();
}
exports.isCustomer = isCustomer;
// }
//# sourceMappingURL=isAuth.js.map