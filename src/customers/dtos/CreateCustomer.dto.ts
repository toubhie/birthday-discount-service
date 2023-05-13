import { IsEmail, IsDate, IsPhoneNumber, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    dob: string;

    @IsNotEmpty()
    @IsDate()
    dateCreated: Date;

    @ApiProperty()
    @IsNotEmpty()
    favoriteCategory: number;
}