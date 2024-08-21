// import './src/boilerplate.polyfill';

import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Address } from 'src/modules/address/entities/address.entity';
import { DataSource } from 'typeorm';

config();
const configService = new ConfigService();

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',

  entities: ['dist/src/modules/**/**/*.entity.js'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});
