import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from './../mail/mail.service';
import { Customer } from './../entities/customer.entity';
import { Product } from './../entities/product.entity';
import { DiscountService } from 'src/discount/discount.service';

import * as moment from 'moment';

@Injectable()
export class ScheduleTaskService {

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @Inject(DiscountService)
        private readonly discountService: DiscountService,

        private mailService: MailService
    ) { }

    
    @Cron( CronExpression.EVERY_DAY_AT_6AM )
    async runBirthdayNotificationTask() {
        try {
            // Get all customers whose birthdays is in 7 days from now
            // Get the date 7 days from now
            const sevenDaysFromNow = moment().add(7, 'days').format('YYYY-MM-DD');
            console.log(sevenDaysFromNow); 

            // Query the database for customers whose birthday is within 7 days from now
            const customers = await this.customerRepository
                .createQueryBuilder('customer')
                // .where(`DATE_PART('day', customer.dob - :sevenDaysFromNow) <= 7`, {
                //     sevenDaysFromNow,
                // })
                .getMany();

            if(!customers){ console.log('No customer whose birthday is : ' + sevenDaysFromNow)}

            for (const customer of customers) {
                // Generate a discount code for each customer and save to a customer_discount_code mappind in the db
                const discountCode = await this.discountService.generateBirthdayDiscountCode(customer.id);

                // Get personalized suggested products for the customer
                const suggestedProducts = await this.productRepository.find({ where: { category: customer.favoriteCategory } });

                await this.mailService.sendBirthdayNotification(customer, discountCode, suggestedProducts);
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}

