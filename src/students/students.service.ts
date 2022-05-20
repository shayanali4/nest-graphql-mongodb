import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListStudentsInput } from './dto/list-students.input';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<Student>,
  ) {}

  create(createStudentInput: CreateStudentInput) {
    const student = new this.studentModel(createStudentInput);
    return student.save();
  }

  findAll() {
    return this.studentModel.find();
  }

  async findOne(id: string) {
    const student = await this.studentModel.findOne({ _id: id }).exec();
    if (!student) {
      throw new NotFoundException(`Student ${id} not found`);
    }
    return student;
  }

  async update(id: string, updateStudentInput: UpdateStudentInput) {
    const existingStudent = await this.studentModel
      .findOneAndUpdate({ _id: id }, { $set: updateStudentInput }, { new: true })
      .exec();

    if (!existingStudent) {
      throw new NotFoundException(`Student ${id} not found`);
    }
    return existingStudent;
  }

  async remove(id: string) {
    const student = await this.findOne(id);
    return student.remove();
  }

  async getStudents() {
    const count = await this.studentModel.count();
    const students = await this.findAll();
    return { students, count };
  }
}
