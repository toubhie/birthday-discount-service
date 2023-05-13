import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { Customer } from '../entities/customer.entity';
import { Discount } from '../entities/discount.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Discount])],
  providers: [DiscountService],
  exports: [DiscountService],
})
export class DiscountModule {}
