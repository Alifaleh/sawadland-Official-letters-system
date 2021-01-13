import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Letter } from "./Letter";
import { Session } from './Session';

@Entity()
export class Admin {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    level: number;

    @OneToMany(type => Letter, letter => letter.admin, {cascade:true})
    letters : Letter[];

    @OneToMany(type => Session, session => session.admin, {cascade:true})
    sessions:Session[];

}
