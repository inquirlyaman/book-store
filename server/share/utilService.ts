export class ResponseUtil {
    successResponse = (res,data) => {
        const response :any  = {};
        response.result = data;
        response.message = data.sucessMsg;
        response.responseCode = data.statusCode;
        return res.status(data.statusCode).json(response)
    }
    getErrorResponse =  (res,data) => {
        return res.status(data.errorCode).json({
            message: data.errMsg,
            error:  data.error,
            errorCode:data.errorCode
        })
    }
}