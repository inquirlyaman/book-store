import { App } from "./app";
import {CONSTANTS} from "./env"
const app = new App().app;

app.listen(CONSTANTS.PORT, () => {
  console.log("Express server listening on port " + CONSTANTS.PORT);
});
