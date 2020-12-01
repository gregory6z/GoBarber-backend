"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes = express_1.Router();
routes.post('/', function (request, response) {
    // return response.json({ message: 'Hello GoStack' });
    var _a = request.body, name = _a.name, email = _a.email;
    var user = {
        email: email,
        name: name,
    };
    return response.json(user);
});
exports.default = routes;
