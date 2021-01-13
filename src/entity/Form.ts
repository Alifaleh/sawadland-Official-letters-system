import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm";
import { Letter } from "./Letter";
import { FormData } from "./FormData";

@Entity()
export class Form {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    subject: string;

    @Column()
    greeting: string;

    @Column()
    paragraph: string;

    @Column()
    footer: string;

    @OneToMany(type => Letter, letter => letter.form)
    letters:Letter[];

    @OneToMany(type => FormData, formData => formData.form)
    formData:FormData[];

}
