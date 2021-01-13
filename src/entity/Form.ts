import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm";
import { Letter } from "./Letter";

@Entity()
export class Form {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    subject: string;

    @OneToMany(type => Letter, letter => letter.form)
    letters:Letter[]

}
