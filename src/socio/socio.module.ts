/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocioEntity } from '../socio/socio.entity';
import { SocioService } from '../socio/socio.service';
import { SocioController } from './socio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SocioEntity])],
  providers: [SocioService],
  controllers: [SocioController]
})
export class SocioModule {}

