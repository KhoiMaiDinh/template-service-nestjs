import { NumberField } from 'src/decorators/field.decorator';

export class CreateAddressDto {
  @NumberField({ nullable: false })
  longitude: number;
  @NumberField({ nullable: false })
  latitude: number;
}
