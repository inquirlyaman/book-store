"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANTS = void 0;
const env = process.env;
exports.CONSTANTS = {
    PORT: env.PORT || 9000,
    SECRET_KEY: env.SECRET_KEY || 'jwtsecretkeyisherethisshouldbesecret',
};
//# sourceMappingURL=env.js.map