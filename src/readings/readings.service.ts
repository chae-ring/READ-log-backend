import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateReadingDto } from '../dto/readings.dto';
import { Status } from '@prisma/client'; // Prisma에서 가져온 Status 열거형
import { Genre } from '@prisma/client'; // Prisma에서 가져온 Status 열거형

@Injectable()
export class ReadingsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReading(createReadingDto: CreateReadingDto, userId: number) {
    return await this.prisma.readingStatus.create({
      data: {
        userId,
        name: createReadingDto.name,
        writer: createReadingDto.writer,
        startReadDate: new Date(createReadingDto.startReadDate), // Date 객체로 변환
        status: createReadingDto.status as Status, // status를 Status로 강제 변환
        lastReadDate: new Date(createReadingDto.lastReadDate), // Date 객체로 변환
        genre: createReadingDto.genre as Genre,
        currentPage: createReadingDto.currentPage,
        totalPage: createReadingDto.totalPage,
      },
    });
  }
}
