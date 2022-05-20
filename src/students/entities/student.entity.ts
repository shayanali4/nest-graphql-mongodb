import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
@ObjectType()
export class Student {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  @Field(() => String, { description: 'Student name ' })
  name: string;
  @Prop()
  @Field(() => String, { description: 'Student Roll #' })
  rollNumber: string;
  @Prop()
  @Field(() => String, { description: 'Student email ' })
  email: string;
  @Prop()
  @Field(() => String, { description: 'Student age' })
  age: string;
  @Prop()
  @Field(() => String, { description: 'Student phone' })
  phone: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
