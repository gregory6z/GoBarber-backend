"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(routes_1.default);
app.get('/', function (request, response) {
    return response.json({ message: 'Hello World' });
});
app.listen(3333, function () {
    console.log('Server started on port 3333');
});
