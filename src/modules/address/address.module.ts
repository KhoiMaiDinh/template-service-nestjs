import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  // imports: [SharedModule]
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
