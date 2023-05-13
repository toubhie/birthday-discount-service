import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../../entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from '../dtos/CreateCustomer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
  ) {}

  getAllCustomers() {
    return this.customerRepository.find();
  }

  getCustomerById(id: number) {
    return this.customerRepository.findOneBy({id: id}); 
  }
}