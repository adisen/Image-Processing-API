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
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function resizeImage(file, width, height, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if a file has been resized already
        const fileName = path_1.default.join(__dirname, "..", "..", "thumb", `${filename}-${width}-${height}.png`);
        if (fs_1.default.existsSync(fileName)) {
            return fileName;
        }
        // Else resize
        yield (0, sharp_1.default)(file)
            .resize({
            width: Number(width),
            height: Number(height),
        })
            .toFormat("png", { mozjpeg: true })
            .toFile(path_1.default.join(__dirname, "..", "..", "thumb", `${filename}-${width}-${height}.png`));
        return fileName;
    });
}
exports.default = resizeImage;
