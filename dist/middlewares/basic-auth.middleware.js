"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalBasicAuthMiddleware = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const globalBasicAuthMiddleware = (req, res, next) => {
    const role = req.headers.role;
    if (!role) {
        return res.sendStatus(http_status_codes_1.HTTP_STATUS_CODES.UNAUTHORIZED);
    }
    if (Number(role) !== 1) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
    return;
};
exports.globalBasicAuthMiddleware = globalBasicAuthMiddleware;
