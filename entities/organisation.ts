import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
  ColumnOptions
} from 'typeorm'

import { OrganisationUser } from './organisationUser'
import { OrganisationProject } from './organisationProject'
import { Project } from './project'
// import { RelationColumn } from '../helpers'
function RelationColumn (options?: ColumnOptions) {
  return Column({ nullable: true, ...options })
}
@Entity()
@ObjectType()
export class Organisation {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column()
  title: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string

  @Field(type => [Project])
  projects?: Project[]

  //Manually get the join table
  @Field(type => [OrganisationProject], { nullable: true })
  @OneToMany(
    type => OrganisationProject,
    organisationProject => organisationProject.organisation
  )
  organisationProjects?: OrganisationProject[]

  // @RelationColumn()
  // projectOrganisationsOrganisationId: number

  // @Field(type => User)
  // @ManyToOne(type => User)
  // author: User
  // @RelationColumn()
  // authorId: number
}
