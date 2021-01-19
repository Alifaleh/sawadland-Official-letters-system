import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Letter } from "./Letter";

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

    @OneToMany(type => Letter, letter => letter.admin)
    letters : Letter[];

}
