import { Module } from '@nestjs/common';
import { AddressModule } from './modules/address/address.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService } from './shared/services/api-config.service';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AddressModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env', '.env.development', '.env.test', '.env.production'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.postgresConfig,
      inject: [ApiConfigService],
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return Promise.resolve(new DataSource(options));
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
