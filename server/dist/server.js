"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const app = new app_1.App().app;
const PORT = process.env.port || 9000;
app.listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
});
//# sourceMappingURL=server.js.map