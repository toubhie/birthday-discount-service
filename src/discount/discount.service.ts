import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './../entities/customer.entity';
import { Discount } from './../entities/discount.entity';
import * as moment from 'moment';

@Injectable()
export class DiscountService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,

        @InjectRepository(Discount)
        private discountRepository: Repository<Discount>,
    ) { }

    async generateBirthdayDiscountCode(id: number): Promise<string> {
        try {
            // Find customer by ID
            const customer = await this.customerRepository.findOneBy({ id: id });

            if (!customer) {
                throw new Error(`Customer with ID ${id} not found`);
            }

            // Generate discount code e.g HBD-TOBI WILLIAMS-2023
            const discountCode = `HBD-${customer.name.toUpperCase()}-${moment().year()}`;

            // Check if discount code has already been created
            const discountInDB = await this.discountRepository.findOneBy({ code: discountCode });

            if (!discountInDB) {
                // Set discount due date to be a week after the customer's birthday
                const dueDate = moment(customer.dob).add(1, 'week').format('YYYY-MM-DD');
        
                // Create discount entry
                const discount = new Discount();

                discount.code = discountCode;
                discount.description = `Birthday discount code for ${customer.name}`;
                discount.dueDate = dueDate;

                await this.discountRepository.save(discount); 

                // Save discount code to customer
                customer.birthdayDiscountCode = discountCode;
                await this.customerRepository.save(customer);
            }

            return discountCode;
        } catch (error) {
            console.log(error);
        }

    }

    async createDiscount(code: string, description: string, dueDate: string): Promise<Discount> {
        try {
            const discount = new Discount();

            discount.code = code;
            discount.description = description;
            discount.dueDate = dueDate;

            return await this.discountRepository.save(discount);
        } catch (error) {
            console.log(error);
        }

    }
}