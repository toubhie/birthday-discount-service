import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { CustomersService } from '../services/customers.service';
  
  @Controller('customers')
  export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}
  
    @Get()
    getAllCustomers() {
      return this.customersService.getAllCustomers();
    }
  
    @Get('id/:id')
    findCustomerById(@Param('id', ParseIntPipe) id: number) {
      return this.customersService.getCustomerById(id);
    }
  }