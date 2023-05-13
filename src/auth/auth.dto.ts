import { Trim } from 'class-sanitizer';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty()
    @Trim()
    @IsEmail()
    public readonly email: string;

    @ApiProperty()
    @IsString()
    public readonly password: string;
}