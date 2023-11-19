/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { SocioEntity } from "../socio/socio.entity"
import { Column, Entity, JoinTable, ManyToMany,PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ClubEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    fechaFundacion: Date;

    @Column({ length: 100 })
    descripcion: string;

    @Column()
    imagen: string;

    @ManyToMany(() => SocioEntity, socio => socio.clubs)    
    socios: SocioEntity[];
}
