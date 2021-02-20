import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn} from "typeorm";
import { Form } from "./Form";

@Entity()
export class FormData {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    dataName: string;

    @ManyToOne(type => Form, form => form.formData, {cascade:true})
    @JoinColumn()
    form:Form;

}
