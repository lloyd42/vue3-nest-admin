import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { Log4jsLogger } from '@nestx-log4js/core';

const port = '3000';
const version = '1.0';
const globalPrefix = `/api/v${version}`;
const logger = new Logger('main.ts');

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Vue3 Nest Admin')
    .setDescription('为 Vue3 Admin 提供 API')
    .setVersion(version)
    .addTag('Vue3 Admin')
    .addServer(globalPrefix)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix(globalPrefix);
  app.useLogger(app.get(Log4jsLogger));

  await app.listen(port);
};
bootstrap().then(() => {
  logger.log(`Listen in http://localhost:${port}`);
});
