/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SocioDto } from '../socio/socio.dto';

import { SocioClubService } from '../socio-club/socio-club.service';
import { SocioEntity } from 'src/socio/socio.entity';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class SocioClubController {
    constructor(private readonly socioClubService: SocioClubService){}

    @Post(':clubId/members/:socioId')
    async addMemberToClub(@Param('clubId') clubId: string, @Param('socioId') socioId: string){
        return await this.socioClubService.addMemberToClub(clubId, socioId);
    }

    @Get(':clubId/members')
    async findMembersFromClub(@Param('clubId') clubId: string){
        return await this.socioClubService.findMembersFromClub(clubId);
    }

    @Get(':clubId/members/:socioId')
    async findMemberFromClub(@Param('clubId') clubId: string, @Param('socioId') socioId: string){
        return await this.socioClubService.findMemberFromClub(clubId, socioId);
    }


    @Put(':clubId/members')
    async updateMembersFromClub(@Param('clubId') clubId: string,@Body() sociosDto: SocioDto[]) {
        const socios = plainToInstance(SocioEntity, sociosDto)
        return await this.socioClubService.updateMembersFromClub(clubId, socios);
    }


    @Delete(':clubId/members/:socioId')
    @HttpCode(204)
    async deleteMemberFromClub(@Param('clubId') clubId: string, @Param('socioId') socioId: string){
        return await this.socioClubService.deleteMemberFromClub(clubId, socioId);
    }
}

// /clubs/1/members/4 para findMemberFromClub) e implemente los endpoints:
// addMemberToClub
// findMembersFromClub
// findMemberFromClub
// updateMembersFromClub
// deleteMemberFromClub

