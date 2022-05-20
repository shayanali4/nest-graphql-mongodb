import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: 'mongodb+srv://admin:admin123@nest-graphql.eaqa3.mongodb.net/?retryWrites=true&w=majority',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}
