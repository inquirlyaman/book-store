"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
class ResponseUtil {
    constructor() {
        this.successResponse = (res, data) => {
            const response = {};
            response.result = data;
            response.message = data.sucessMsg;
            response.responseCode = data.statusCode;
            return res.status(data.statusCode).json(response);
        };
        this.getErrorResponse = (res, data) => {
            return res.status(data.errorCode).json({
                message: data.errMsg,
                error: data.error,
                errorCode: data.errorCode
            });
        };
    }
}
exports.ResponseUtil = ResponseUtil;
//# sourceMappingURL=utilService.js.map