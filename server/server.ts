import { App } from "./app";
const app = new App().app;
const PORT = process.env.port || 9000;
app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});
