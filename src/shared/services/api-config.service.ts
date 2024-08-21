import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { Address } from 'src/modules/address/entities/address.entity';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }

  get postgresConfig(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../../modules/**/entities/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
      Address,
    ];
    const migrations = [__dirname + '/../../database/migrations/*{.ts,.js}'];

    console.log(__dirname);

    return {
      entities,
      migrations,
      keepConnectionAlive: !this.isTest,
      dropSchema: this.isTest,
      type: 'postgres',
      name: 'default',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      migrationsRun: true,
      logging: this.getBoolean('ENABLE_ORM_LOGS'),
      // namingStrategy: new SnakeNamingStrategy(),
    };
  }

  get GoongConfig() {
    return {
      apiKey: this.getString('GOONG_API_KEY'),
      baseUrl: this.getString('GOONG_BASE_URL'),
    };
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replaceAll('\\n', '\n');
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }
}
