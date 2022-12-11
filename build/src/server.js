"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_1 = __importDefault(require("./routes/image"));
const app = (0, express_1.default)();
const port = 3000;
// Define routes
app.use("/api/image", image_1.default);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
