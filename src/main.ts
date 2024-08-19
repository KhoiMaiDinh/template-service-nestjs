import { NestFactory } from '@nestjs/core';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

import { AppModule } from 'src/app.module';
import { SharedModule } from 'src/shared/shared.module';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { setupSwagger } from 'src/setup-swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException(errors);
      },
    }),
  );

  const configService = app.select(SharedModule).get(ApiConfigService);

  setupSwagger(app);

  const port = configService.appConfig.port;
  await app.listen(port);

  console.info(`server running on ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
