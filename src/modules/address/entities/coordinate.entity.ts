import { NumberField } from 'src/decorators/field.decorator';

export class Coordinate {
  @NumberField({ nullable: false })
  longitude: number;
  @NumberField({ nullable: false })
  latitude: number;
}
