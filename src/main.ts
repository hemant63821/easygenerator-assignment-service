import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './HttpExceptionFilter/HttpExceptionFilter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.enableCors({
    allowedHeaders: "*",
    origin: "*"
  });
  app.useGlobalPipes(new ValidationPipe());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
  await app.listen(8080);
}
bootstrap();
