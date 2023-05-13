import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './auth.dto';
import { CreateCustomerDto } from '../customers/dtos/CreateCustomer.dto';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
  @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>;

  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: CreateCustomerDto): Promise<Customer | never> {
    try {
      const requiredFields = ['username', 'name', 'email', 'phoneNumber', 'password', 'dob'];

      for (const field of requiredFields) {
        if (!body[field]) {
          throw new HttpException(`${field.charAt(0).toUpperCase() + field.slice(1)} must be provided`, HttpStatus.BAD_REQUEST);
        }
      }

      const { username, name, email, phoneNumber, password, dob, favoriteCategory }: CreateCustomerDto = body;

      let customer: Customer = await this.customerRepository.findOne({ where: { email } });

      if (customer) {
        throw new HttpException('Customer with this profile already exist', HttpStatus.CONFLICT);
      }

      customer = new Customer();

      customer.username = username;
      customer.name = name;
      customer.email = email;
      customer.phoneNumber = phoneNumber;
      customer.password = this.helper.encodePassword(password);
      customer.dob = dob;
      customer.favoriteCategory = favoriteCategory;

      return this.customerRepository.save(customer);
    } catch (error) {
      console.error(error);
      throw new HttpException('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  public async login(body: LoginDto): Promise<Object | never> {
    try {
      const { email, password }: LoginDto = body;

      // Check if customer exists with given email
      const customer: Customer = await this.customerRepository.findOne({ where: { email } });

      if (!customer) {
        throw new HttpException('No customer found', HttpStatus.NOT_FOUND);
      }

      // Check if password is correct
      const isPasswordValid: boolean = this.helper.isPasswordValid(password, customer.password);

      if (!isPasswordValid) {
        throw new HttpException('No customer found', HttpStatus.NOT_FOUND);
      }

      await this.customerRepository.update(customer.id, { lastLoginAt: new Date() });

      // Generate token for authenticated customer
      customer.token = this.helper.generateToken(customer);

      // Get personalized suggested products for the customer
      const suggestedProducts = await this.productRepository.find({ where: { category: customer.favoriteCategory } });

      return { customer, suggestedProducts };
    } catch (error) {
      console.error(error);
      throw new HttpException('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async refreshToken(customer: Customer): Promise<string> {
    try{
      this.customerRepository.update(customer.id, { lastLoginAt: new Date() });

      return this.helper.generateToken(customer);
    } catch (error) {
      console.error(error);
      throw new HttpException('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}