/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ClubEntity } from "../club/club.entity"
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SocioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombreUsuario: string;

    @Column()
    fechaNacimiento: Date;

    @Column()
    email: string;

    @ManyToMany(() => ClubEntity, club => club.socios)
    @JoinTable()
    clubs: ClubEntity[];

}
