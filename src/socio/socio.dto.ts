/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class SocioDto {
  @IsString()
  @IsNotEmpty()
  readonly nombreUsuario: string;
  
  @IsString()
  @IsNotEmpty()
  readonly fechaNacimiento: Date;
  
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  

}

