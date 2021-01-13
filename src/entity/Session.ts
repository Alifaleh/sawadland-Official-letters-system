import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Admin } from "./Admin";

@Entity()
export class Session {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    secret: string;

    @Column({type:'timestamp'})
    Date: Date;

    @Column()
    signature: string;

    @ManyToOne(type => Admin, admin => admin.sessions, {cascade:true})
    @JoinColumn()
    admin: Admin;

}
