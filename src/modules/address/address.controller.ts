import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CoordinateDto } from './dto/coordinate.req.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({ version: '1', path: 'address' })
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    return await this.addressService.create({
      latitude: createAddressDto.latitude,
      longitude: createAddressDto.longitude,
    });
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':longitude/:latitude')
  findByLongLat(@Param() { longitude, latitude }: CoordinateDto) {
    return this.addressService.findByCoordinates({ longitude, latitude });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
