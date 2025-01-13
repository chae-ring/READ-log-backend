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
  async getReadingsByStatus(userId: number, status: Status) {
    return await this.prisma.readingStatus.findMany({
      where: { userId, status }, // status 값으로 필터링
    });
  }
  // 독서 현황 수정
  async updateReading(
    userId: number,
    readingId: number,
    updateDto: CreateReadingDto,
  ) {
    return await this.prisma.readingStatus.update({
      where: { id: readingId },
      data: {
        userId,
        name: updateDto.name,
        writer: updateDto.writer,
        startReadDate: new Date(updateDto.startReadDate),
        status: updateDto.status as Status,
        lastReadDate: new Date(updateDto.lastReadDate),
        genre: updateDto.genre as Genre,
        currentPage: updateDto.currentPage,
        totalPage: updateDto.totalPage,
      },
    });
  }

  // 독서 현황 삭제
  async deleteReading(userId: number, readingId: number) {
    return await this.prisma.readingStatus.delete({
      where: { id: readingId },
    });
  }
}
