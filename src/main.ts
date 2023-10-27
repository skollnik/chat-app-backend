import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIOAdapter } from './sockets/socket-io.adapter';
import { ConfigService } from '@nestjs/config';
const cluster = require('cluster');

if (cluster.isMaster) {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.enableCors({
      exposedHeaders: ['Content-Disposition'],
    });
    app.useWebSocketAdapter(new SocketIOAdapter(app, configService));
    await app.listen(8080);
  }
  bootstrap();
}
