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
exports.testFunction = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const router = express_1.default.Router();
const testFunction = () => {
    return "test";
};
exports.testFunction = testFunction;
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get query params
    const { filename, width, height } = req.query;
    try {
        // Get image from full folder
        const imagePath = path_1.default.join(__dirname, "..", "..", "full", `${filename}.jpg`);
        const image = yield promises_1.default.readFile(imagePath);
        const metadata = yield (0, sharp_1.default)(image).metadata();
        // console.log(metadata);
        // Use sharp to resiz
        res.send("Done");
    }
    catch (error) {
        console.log("file does not exist");
        res.status(404).send("File Not found");
    }
}));
exports.default = router;
