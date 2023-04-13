import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(
    MainModule,
    new ExpressAdapter(),
  );
  await app.listen(3000);
}
bootstrap();
