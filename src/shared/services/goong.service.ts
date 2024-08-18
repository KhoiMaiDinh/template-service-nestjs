import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';
import { catchError, map } from 'rxjs';
import { CoordinateDto } from 'src/modules/address/dto/coordinate.dto';

@Injectable()
export class GoongService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  constructor(
    private http: HttpService,
    public configService: ApiConfigService,
  ) {
    const GoongConfig = configService.GoongConfig;

    this.apiKey = GoongConfig.apiKey;
    this.baseUrl = GoongConfig.baseUrl;
  }

  async getAddressesByCoordinate(coordinateDto: CoordinateDto) {
    const apiPath = `${this.baseUrl}/Geocode?latlng=${coordinateDto.latitude},%${coordinateDto.longitude}&api_key=${this.apiKey}`;
    return this.http
      .get(apiPath)
      .pipe(
        map((res) => res.data),
        map((data) => data),
      )
      .pipe(
        catchError((e) => {
          console.log(e);
          throw new ForbiddenException('API not available');
        }),
      );
  }
}
