import { Module } from '@nestjs/common';
import { AddressModule } from './modules/address/address.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AddressModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env', '.env.development', '.env.test', '.env.production'],
    }),
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
