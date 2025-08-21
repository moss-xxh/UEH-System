import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Charging Station SaaS API v1.0.0';
  }
}