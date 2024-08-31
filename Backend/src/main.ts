import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors: {
      origin: '*',
      allowedHeaders: '*',
    },
  });
  await app.listen(3000);
}
bootstrap();
