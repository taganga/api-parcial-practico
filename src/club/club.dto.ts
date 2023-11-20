/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsUrl } from 'class-validator';
export class ClubDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsString()
    @IsNotEmpty()
    readonly fechaFundacion: Date;
    
    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    @IsUrl()
    @IsNotEmpty()
    readonly imagen: string;


}



