"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./env");
const app = new app_1.App().app;
app.listen(env_1.CONSTANTS.PORT, () => {
    console.log("Express server listening on port " + env_1.CONSTANTS.PORT);
});
//# sourceMappingURL=server.js.map