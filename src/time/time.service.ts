import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeService {
  now(): Date {
    return new Date();
  }

  reserveUntil(minutes: number): Date {
    const now = this.now();
    return new Date(now.getTime() + minutes * 60000); // 60000ms = 1 minute
  }
}
