import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
