/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SocioEntity } from '../socio/socio.entity';
import { Repository } from 'typeorm';
import { ClubEntity } from '../club/club.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SocioClubService } from './socio-club.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('SocioClubService', () => {
  let service: SocioClubService;
  let clubRepository: Repository<ClubEntity>;
  let socioRepository: Repository<SocioEntity>;
  let club: ClubEntity;
  let sociosList : SocioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SocioClubService],
    }).compile();

    service = module.get<SocioClubService>(SocioClubService);    
    clubRepository = module.get<Repository<ClubEntity>>(getRepositoryToken(ClubEntity));
    socioRepository = module.get<Repository<SocioEntity>>(getRepositoryToken(SocioEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    socioRepository.clear();
    clubRepository.clear();

    sociosList = [];
    for(let i = 0; i < 5; i++){
        const socio: SocioEntity = await socioRepository.save({
          nombreUsuario: faker.person.firstName(), 
          fechaNacimiento:faker.date.between({ from: '1930-01-01', to: '2020-12-31' }),
          email: faker.internet.email().toLowerCase() 
        })
        sociosList.push(socio);
    }

    club = await clubRepository.save({
      nombre: faker.company.name(), 
        fechaFundacion:faker.date.between({ from: '1980-01-01', to: '2020-12-31' }),
        descripcion: faker.lorem.sentence(), 
        imagen: faker.image.url(),
        socios: sociosList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addMemberToClub should add an socio to a club', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      nombreUsuario: faker.person.firstName(), 
      fechaNacimiento:faker.date.between({ from: '1930-01-01', to: '2020-12-31' }),
      email: faker.internet.email().toLowerCase()
    });

    const newClub: ClubEntity = await clubRepository.save({
        nombre: faker.company.name(), 
        fechaFundacion:faker.date.between({ from: '1980-01-01', to: '2020-12-31' }),
        descripcion: faker.lorem.sentence(), 
        imagen: faker.image.url(),
    })
    const result: ClubEntity = await service.addMemberToClub(newSocio.id, newClub.id);

    expect(result.socios.length).toBe(1);
    expect(result.socios[0]).not.toBeNull();
    expect(result.socios[0].nombreUsuario).toBe(newSocio.nombreUsuario)
    expect(result.socios[0].fechaNacimiento).toStrictEqual(newSocio.fechaNacimiento)
    expect(result.socios[0].email).toBe(newSocio.email)   
  });

  it('findMembersFromClub should return socios by club', async ()=>{
    const socios: SocioEntity[] = await service.findMembersFromClub(club.id);
    expect(socios.length).toBe(5)
  });

  it('findMembersFromClub should throw an exception for an invalid club', async () => {
    await expect(()=> service.findMembersFromClub("0")).rejects.toHaveProperty("message", "The club with the given id was not found"); 
  });





















});
