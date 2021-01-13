import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Admin } from "./Admin";
import { Form } from "./Form";
import { LetterData } from "./LetterData";

@Entity()
export class Letter {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'timestamp'})
    Date: Date;

    @Column()
    signature: string;

    @ManyToOne(type => Admin, admin => admin.letters, {cascade:true})
    @JoinColumn()
    admin: Admin;

    @ManyToOne(type => Form, form => form.letters, {cascade:true})
    @JoinColumn()
    form:Form;

    @OneToMany(type => LetterData, letterData => letterData.letter)
    letterData:Letter[];

}
