import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UserModule } from './modules/user/user.module';
import { TutorialModule } from './modules/tutorial/tutorial.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(databaseConfig()), UserModule, TutorialModule, ProductModule, OrderModule, ReviewModule],
})
export class AppModule {}
