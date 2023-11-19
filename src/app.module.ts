/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClubModule } from './club/club.module';
import { SocioModule } from './socio/socio.module';
import { SocioEntity } from './socio/socio.entity';
import { ClubEntity } from './club/club.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocioClubModule } from './socio-club/socio-club.module';

@Module({
  imports: [ClubModule,SocioModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin123',
    database: 'club',
    entities: [SocioEntity, ClubEntity],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }),
    SocioClubModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
