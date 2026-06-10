import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'mysql',
  port: Number(process.env.MYSQL_PORT || 3306),
  username: process.env.MYSQL_USER || 'craft_user',
  password: process.env.MYSQL_PASSWORD || 'craft_pass',
  database: process.env.MYSQL_DATABASE || 'craftapi',
  autoLoadEntities: true,
  synchronize: true,
});
