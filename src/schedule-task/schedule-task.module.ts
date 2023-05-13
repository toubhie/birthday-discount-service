import { Module } from '@nestjs/common';
import { ScheduleTaskService } from './schedule-task.service';
import { DiscountModule } from 'src/discount/discount.module';
import { Customer } from '../entities/customer.entity';
import { Product } from '../entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DiscountModule, TypeOrmModule.forFeature([Customer, Product])],
  providers: [ScheduleTaskService],
  exports: [ScheduleTaskService],
})
export class ScheduleTaskModule {}
