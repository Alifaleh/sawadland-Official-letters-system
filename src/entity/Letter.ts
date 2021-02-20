import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Generated} from "typeorm";
import { Admin } from "./Admin";
import { Form } from "./Form";
import { LetterData } from "./LetterData";

@Entity()
export class Letter {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('increment')
    serial: number;

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
