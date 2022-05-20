import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListStudentsInput {
  @Field(() => Number, { description: 'classical limit' })
  limit: number;
  @Field(() => Number, { description: 'classical offset' })
  offset: number;
}
