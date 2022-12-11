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
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const resizeImage_1 = __importDefault(require("../utils/resizeImage"));
const req = (0, supertest_1.default)(server_1.default);
describe("Test Image endpoint", () => {
    it("should return 200 to show server is working as expected", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield req.get("/");
            expect(res.status).toBe(200);
        }
        catch (error) {
            console.log("Error");
        }
    }));
    it("should return 200 to make sure the endpoint it working", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield req.get("/api/image?filename=fjord&width=100&height=100");
            expect(res.status).toBe(200);
        }
        catch (error) {
            console.log("Error");
        }
    }));
    it("should resize the image", () => __awaiter(void 0, void 0, void 0, function* () {
        const filename = "fjord";
        const width = 200;
        const height = 300;
        try {
            // Check if file exists and delete
            const filepath = path_1.default.join(__dirname, "..", "..", "thumb", `${filename}-${width}-${height}.png`);
            if (fs_1.default.existsSync(filepath)) {
                fs_1.default.unlinkSync(filepath);
            }
            const imagePath = path_1.default.join(__dirname, "..", "..", "full", `${filename}.jpg`);
            const image = yield fs_1.default.readFileSync(imagePath);
            const res = yield (0, resizeImage_1.default)(image, width, height, filename);
            expect(res).toBe(path_1.default.join(__dirname, "..", "..", "thumb", `${filename}-${width}-${height}.png`));
        }
        catch (error) {
            console.log("Error");
        }
    }));
});
