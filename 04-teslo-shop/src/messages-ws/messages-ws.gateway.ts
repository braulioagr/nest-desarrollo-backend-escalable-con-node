import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({cors: true,})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
  ) {}

  public async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload
    try{
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, payload.id);
    }
    catch(error) {
      client.disconnect();
      return;
    }


    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  public handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
  }

  @SubscribeMessage('message-from-client')
  public handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    //! Emite unicamente al cliente.
    // client.emit('message-from-server', {
    //   fullName: 'I am',
    //   message: payload.message || 'no message',
    // });

    //! Emite a todos MENOS al cliente inicial.
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'I am',
    //   message: payload.message || 'no message',
    // });

    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'no message',
    });
  }
  
}