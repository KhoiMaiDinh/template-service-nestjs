import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CoordinateDto } from './dto/coordinate.dto';
import { GoongService } from 'src/shared/services/goong.service';

@Injectable()
export class AddressService {
  constructor(private goongService: GoongService) {}
  create(createAddressDto: CreateAddressDto) {
    return 'This action adds a new address';
  }

  findAll() {
    return `This action returns all address`;
  }

  async findByCoordinates(coordinateDto: CoordinateDto) {
    const address =
      await this.goongService.getAddressesByCoordinate(coordinateDto);
    return address;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
