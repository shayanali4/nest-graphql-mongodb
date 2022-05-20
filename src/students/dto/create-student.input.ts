import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field(() => String, { description: 'name of the student' })
  name: string;
  @Field(() => String, { description: 'roll number of the student' })
  rollNumber: string;
  @Field(() => String, { description: 'email of the student' })
  email: string;
  @Field(() => String, { description: 'age of the student' })
  age: string;
  @Field(() => String, { description: 'phone of the student' })
  phone: string;
}
