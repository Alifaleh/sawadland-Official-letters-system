import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn} from "typeorm";
import { Letter } from "./Letter";

@Entity()
export class LetterData {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    dataName: string;

    @Column()
    dataValue: string;

    @ManyToOne(type => Letter, letter => letter.letterData, {cascade:true})
    @JoinColumn()
    letter:Letter;

}
