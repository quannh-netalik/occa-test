import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    operationId: 'health',
    description: 'Endpoint to test',
  })
  @ApiTags('health-check')
  health(): string {
    return this.appService.health();
  }
}
