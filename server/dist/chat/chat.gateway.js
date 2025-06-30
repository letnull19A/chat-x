"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const nestjs_pino_1 = require("nestjs-pino");
let ChatGateway = class ChatGateway {
    constructor(logger) {
        this.logger = logger;
    }
    afterInit(server) {
        this.logger.log('initialized!');
    }
    handleMessage(client, payload) {
        return 'Hello world!';
    }
    handleJoinChat(client, payload) {
        return 'joined in chat';
    }
    handleConnectToChat() { }
    handleDisconnectFromChat() { }
    handleLeaveFromChat() { }
    handleConnection() {
        this.logger.log('successful connected');
    }
    handleDisconnect() {
        this.logger.log('client disconnected');
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_b = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _b : Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", String)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", String)
], ChatGateway.prototype, "handleJoinChat", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof nestjs_pino_1.Logger !== "undefined" && nestjs_pino_1.Logger) === "function" ? _a : Object])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map