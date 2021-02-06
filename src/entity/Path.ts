import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";


@Entity()
export class Path {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    from: string;

    @Column()
    from_ps: string;

    @Column()
    to: string;

    @Column()
    to_ps: string;

    @Column()
    type: String;

    @Column()
    portSpeed: String;

    @Column()
    lastBandwidth: number;

    @Column()
    unit: string;


}
