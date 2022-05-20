import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsResolver } from './students.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './entities/student.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
  ],
  providers: [StudentsResolver, StudentsService],
})
export class StudentsModule {}
