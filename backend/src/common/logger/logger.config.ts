import { LoggerService, Logger } from '@nestjs/common';

export function createAppLogger(context = 'CraftApi'): LoggerService {
  return new Logger(context, { timestamp: true });
}
