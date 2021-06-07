import express, { Request, Response, NextFunction } from 'express';
import jwt  from 'jsonwebtoken'
import { CONSTANTS } from '../env';

interface IUserRequest extends express.Request {
    
        userId: string,
        userEmail: string,
        userRoles: string[]
}

// export class IsAuth { 
export function isAuth(req: IUserRequest, res: Response, next: NextFunction){
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            const error = new Error('Not authenticated.');
            throw error;
        }
        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, CONSTANTS.SECRET_KEY);
            console.log('decodedToken', decodedToken)
        } catch (err) {
            err.statusCode = 500;
            throw err;
        }
        if (!decodedToken) {
            const error = new Error('Not authenticated.');
            // error.statusCode = 401;
            throw error;
        }

        req.userId = decodedToken.userId;
        req.userRoles = decodedToken.roles
        req.userEmail = decodedToken.email
        console.log('req.userId: ',req.userId)
        next();
}

export function isAdmin(req: IUserRequest, res: Response, next: NextFunction) {
    if (req.userRoles.length && !req.userRoles.includes('admin')) {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // authentication and authorization successful
    console.log('req.user: ', req.userId, ':: roles: ', req.userRoles)
    next();
} 

export function isCustomer(req: IUserRequest, res: Response, next: NextFunction) {
    if (req.userRoles.length && !req.userRoles.includes('customer')) {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // authentication and authorization successful
    console.log('req.user: ', req.userId, ':: roles: ', req.userRoles)
    next();
}
// }