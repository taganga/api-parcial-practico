/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocioEntity } from '../socio/socio.entity';
import { ClubEntity } from '../club/club.entity';
import { SocioClubService } from './socio-club.service';

@Module({
  providers: [SocioClubService],
  imports: [TypeOrmModule.forFeature([SocioEntity, ClubEntity])],
})
export class SocioClubModule {}
