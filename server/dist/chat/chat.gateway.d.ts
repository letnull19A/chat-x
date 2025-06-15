import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from 'nestjs-pino';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger;
    constructor(logger: Logger);
    server: Server;
    afterInit(server: Server): void;
    handleMessage(client: Socket, payload: any): string;
    handleJoinChat(client: Socket, payload: any): string;
    handleConnectToChat(): void;
    handleDisconnectFromChat(): void;
    handleLeaveFromChat(): void;
    handleConnection(): void;
    handleDisconnect(): void;
}
