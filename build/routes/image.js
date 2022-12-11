"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const resizeImage_1 = __importDefault(require("../utils/resizeImage"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get query params
    const { filename, width, height } = req.query;
    if (filename === undefined) {
        res.status(400).send("A filename is required");
        return;
    }
    if (width === undefined || isNaN(Number(width)) || +width <= 0) {
        res.status(400).send("Width needs to be a number greater than 0");
        return;
    }
    if (height === undefined || isNaN(Number(height)) || +height <= 0) {
        res.status(400).send("Height needs to be a number greater than 0");
        return;
    }
    try {
        // Get image from full folder
        const imagePath = path_1.default.join(__dirname, "..", "..", "full", `${filename}.jpg`);
        const image = yield promises_1.default.readFile(imagePath);
        // const metadata = await sharp(image).metadata();
        // Use sharp to resize
        const result = yield (0, resizeImage_1.default)(image, width, height, filename);
        res.sendFile(result);
    }
    catch (error) {
        res.status(404).send("File Not found");
    }
}));
exports.default = router;
