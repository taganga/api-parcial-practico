/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocioEntity } from '../socio/socio.entity';
import { ClubEntity } from '../club/club.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Faker } from '@faker-js/faker';

@Injectable()
export class SocioClubService {
    constructor(
        @InjectRepository(SocioEntity)
        private readonly socioRepository: Repository<SocioEntity>,
     
        @InjectRepository(ClubEntity)
        private readonly clubRepository: Repository<ClubEntity>
    ){}

    //addMemberToClub: Asociar un socio a un grupo.
    async addMemberToClub(socioId: string, clubId: string): Promise<ClubEntity> {
        const socio: SocioEntity = await this.socioRepository.findOne({where: {id: socioId}});
        if (!socio)
          throw new BusinessLogicException("The socio with the given id was not found", BusinessError.NOT_FOUND);
       
        const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]}) 
        if (!club)
          throw new BusinessLogicException("The club with the given id was not found", BusinessError.NOT_FOUND);
     
          club.socios = [...club.socios, socio];
        return await this.clubRepository.save(club);
      }

    //findMembersFromClub: Obtener los socios de un grupo.
    async findMembersFromClub(clubId: string): Promise<SocioEntity[]> {
        const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]});
        if (!club)
          throw new BusinessLogicException("The club with the given id was not found", BusinessError.NOT_FOUND)
        
        return club.socios;
    }

    //findMemberFromClub: Obtener un socio de un grupo.
    async findMemberFromClub(clubId: string, socioId: string): Promise<SocioEntity> {
        const socio: SocioEntity = await this.socioRepository.findOne({where: {id: socioId}});
        if (!socio)
          throw new BusinessLogicException("The socio with the given id was not found", BusinessError.NOT_FOUND)
        
        const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]}); 
        if (!club)
          throw new BusinessLogicException("The club with the given id was not found", BusinessError.NOT_FOUND)
    
        const clubSocios: SocioEntity = club.socios.find(e => e.id === socio.id);
    
        if (!clubSocios)
          throw new BusinessLogicException("The socio with the given id is not associated to the club", BusinessError.PRECONDITION_FAILED)
    
        return clubSocios;
    }

    //updateMembersFromClub: Actualizar los socios de un grupo.  

    async updateMembersFromClub(clubId: string,socios:SocioEntity[]): Promise<ClubEntity> {
        const club: ClubEntity = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["socios"] });

        if (!club){        
            throw new BusinessLogicException("The club with the given id was not found.", BusinessError.NOT_FOUND)
        }   
        
        let existen_todos_socios:boolean=true
        for (let i = 0; i <socios.length; i++) {
            const indexSocio =club.socios.findIndex(e => e.id === socios[i].id);
            if (indexSocio == -1){ 
                existen_todos_socios=false
            }        
        }
        if(existen_todos_socios==false)
        {
            throw new BusinessLogicException("The socio with the given id was not found.", BusinessError.NOT_FOUND)                 
        }

        club.socios=socios
        return await this.clubRepository.save(club);

       
    }












    }
