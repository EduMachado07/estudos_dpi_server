"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    id;
    name;
    email;
    password;
    role;
    constructor(props, id) {
        Object.assign(this, props);
        this.id = id ?? (0, uuid_1.v4)();
    }
}
exports.User = User;
