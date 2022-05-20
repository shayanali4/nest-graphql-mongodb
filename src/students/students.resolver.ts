import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
// import { ListStudentsInput } f0rom './dto/list-students.input';
import ConnectionArgs, {
  getPagingParameters,
} from '../common/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import { ListStudentsResponse } from './dto/list.students.response';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Mutation(() => Student)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return this.studentsService.create(createStudentInput);
  }

  @Query(() => [Student], { name: 'students' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Query(() => ListStudentsResponse, { name: 'listStudentsWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListStudentsResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { students, count } = await this.studentsService.getStudents();
    const page = connectionFromArraySlice(students, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @Query(() => Student, { name: 'student' })
  findOne(@Args('_id', { type: () => String }) id: string) {
    return this.studentsService.findOne(id);
  }

  @Mutation(() => Student)
  updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
    return this.studentsService.update(updateStudentInput._id, updateStudentInput);
  }

  @Mutation(() => Student)
  removeStudent(@Args('_id', { type: () => String }) id: string) {
    return this.studentsService.remove(id);
  }
}
