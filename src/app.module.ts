import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './mail/mail.module';
import entities from './entities';
import { ScheduleModule } from '@nestjs/schedule';
import { DiscountModule } from './discount/discount.module';
import { ScheduleTaskModule } from './schedule-task/schedule-task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      // useFactory: (configService: ConfigService) => ({
      //   type: 'postgres',
      //   host: configService.get('DB_HOST'),
      //   port: +configService.get<number>('DB_PORT'),
      //   username: configService.get('DB_USERNAME'),
      //   password: configService.get('DB_PASSWORD'),
      //   database: configService.get('DB_NAME'),
      //   entities: entities,
      //   synchronize: true,
      // }),

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'birthday_discount',
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CustomersModule,
    MailModule,
    ScheduleModule.forRoot(),
    DiscountModule,
    ScheduleTaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}