import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendBirthdayNotification(customer: Customer, discountCode: string, suggestedProducts: any) {
        try {
            console.log('Sending mail');

            await this.mailerService.sendMail({
                to: customer.email,
                from: '"R-ainbow Team" <no-reply@r-ainbow.com>',
                subject: `Happy Birthday from R-ainbow - Enjoy Your Special Discount Code!`,
                template: './birthday_discount_notifiction',
                context: {
                    name: customer.name,
                    discountCode,
                    suggestedProducts
                },
            });
        } catch (error) {
            console.log(error);
        }

    }
}
