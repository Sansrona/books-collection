"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorMessage = void 0;
const createErrorMessage = (message, field) => ({ errorsMessages: [{ message, field }] });
exports.createErrorMessage = createErrorMessage;
