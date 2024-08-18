import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/app.module';
import { SharedModule } from 'src/shared/shared.module';
import { ApiConfigService } from 'src/shared/services/api-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.select(SharedModule).get(ApiConfigService);

  const port = configService.appConfig.port;
  await app.listen(port);

  console.info(`server running on ${await app.getUrl()}`);
}
bootstrap();
