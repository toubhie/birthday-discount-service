import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthHelper {
  @InjectRepository(Customer)
  private readonly repository: Repository<Customer>;

  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get Customer by Customer ID we get from decode()
  public async validateCustomer(decoded: any): Promise<Customer> {
    return this.repository.findOne(decoded.id);
  }

  // Generate JWT Token
  public generateToken(customer: Customer): string {
    return this.jwt.sign({ id: customer.id, email: customer.email });
  }

  // Validate customer's password
  public isPasswordValid(password: string, customerPassword: string): boolean {
    return bcrypt.compareSync(password, customerPassword);
  }

  // Encode customer's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const customer: Customer = await this.validateCustomer(decoded);

    if (!customer) {
      throw new UnauthorizedException();
    }

    return true;
  }
}