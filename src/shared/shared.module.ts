import { HttpModule } from '@nestjs/axios';
import { Global, Module, Provider } from '@nestjs/common';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { GoongService } from './services/goong.service';

const providers: Provider[] = [ApiConfigService, GoongService];

@Global()
@Module({
  imports: [HttpModule],
  providers,
  exports: [...providers, HttpModule],
})
export class SharedModule {}
