import { Controller, Get } from '@nestjs/common';
import { TimeService } from '../time/time.service';

@Controller('health')
export class HealthController {
  constructor(private readonly timeService: TimeService) {}

  @Get()
  check() {
    return {
      status: 'ok',
      time: this.timeService.now().toISOString(),
    };
  }
}
