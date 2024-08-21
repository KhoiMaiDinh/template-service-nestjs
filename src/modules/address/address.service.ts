import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CoordinateDto } from './dto/coordinate.req.dto';
import { GoongService } from 'src/shared/services/goong.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private goongService: GoongService,
  ) {}

  // @Transactional()
  create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address: Address = new Address();
    address.longitude = createAddressDto.longitude;
    address.latitude = createAddressDto.latitude;
    address.address_id = 123;
    return this.addressRepository.save(address);
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
