import { InjectRepository } from 'typeorm-typedi-extensions'

import {
  Resolver,
  FieldResolver,
  Root,
  Ctx,
  Query,
  Arg,
  Mutation,
  Args
} from 'type-graphql'

import { Project } from '../entities/project'
import { User } from '../entities/user'
import { Repository } from 'typeorm'

import { ProjectInput } from './types/project-input'
import { Context } from '../index'
// import { ProjectsArguments } from "./types/projects-arguments";
// import { generateProjects } from "../helpers";

@Resolver(of => Project)
export class ProjectResolver {
  constructor (
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  // @FieldResolver()
  // async author(@Root() project: Project): Promise<User> {
  //   return (await this.userRepository.findOne(project.authorId, { cache: 1000 }))!;
  // }

  // private readonly items: Project[] = generateProjects(100);

  // @Query(returns => [Project])
  // async projects(@Args() { skip, take }: ProjectsArguments): Promise<Project[]> {
  //   const start: number = skip;
  //   const end: number = skip + take;
  //   return await this.items.slice(start, end);
  // }

  @Query(returns => [Project])
  projects (): Promise<Project[]> {
    return this.projectRepository.find()
  }

  @Mutation(returns => Project)
  async addProject (
    @Arg('project') projectInput: ProjectInput,
    @Ctx() { user }: Context
  ): Promise<Project> {
    const project = this.projectRepository.create({
      ...projectInput
      // ...projectInput,
      // authorId: user.id
    })
    return await this.projectRepository.save(project)
  }
  // @Mutation(returns => Project)
  // async addProject(@Arg("input") projectInput: ProjectInput): Promise<Project> {
  //   const project = new Project();
  //   project.description = projectInput.description;
  //   project.title = projectInput.title;
  //   project.creationDate = new Date();

  //   await this.items.push(project);
  //   return project;
  // }
}
