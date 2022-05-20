import { Student } from '../entities/student.entity';
import { ObjectType } from '@nestjs/graphql';
import { RelayTypes } from '../../common/relay/relay.types';

@ObjectType()
export class ListStudentsResponse extends RelayTypes<Student>(Student) {}
