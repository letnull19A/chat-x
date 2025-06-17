import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { Logger } from 'nestjs-pino'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  constructor(private logger: Logger) {}

  @WebSocketServer() server: Server

  afterInit(server: Server) {
    this.logger.log('initialized!')
  }

  @SubscribeMessage('message')
  handleMessage(
    client: Socket,
    payload: any,
  ): string {
    return 'Hello world!'
  }

  @SubscribeMessage('join')
  handleJoinChat(
    client: Socket,
    payload: any,
  ): string {
    return 'joined in chat'
  }

  handleConnectToChat() {}

  handleDisconnectFromChat() {}

  handleLeaveFromChat() {}

  handleConnection() {
    this.logger.log('successful connected')
  }

  handleDisconnect() {
    this.logger.log('client disconnected')
  }
}
