import { Module, Provider } from '@nestjs/common';
import { ApiConfigService } from 'src/shared/services/api-config.service';

const providers: Provider[] = [ApiConfigService];

@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
