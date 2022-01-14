import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = '3000';
  console.log(`Listen in http://localhost:${port}`);

  const options = new DocumentBuilder()
    .setTitle('Vue3 Nest Admin')
    .setDescription('为 Vue3 Admin 提供 API')
    .setVersion('1.0')
    .addTag('Vue3 Admin')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
