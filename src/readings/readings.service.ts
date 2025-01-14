import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReadingDto } from '../dto/readings.dto';
import { Status, Genre, StatType } from '@prisma/client'; // Prisma에서 가져온 Status, Genre 열거형
import { StatisticsService } from 'src/reviews/statistics.service'; // 통계 서비스 임포트

@Injectable()
export class ReadingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly statisticsService: StatisticsService, // 통계 서비스 주입
  ) {}

  // 책 등록 시 자동으로 통계 업데이트
  async createReading(createReadingDto: CreateReadingDto, userId: number) {
    const reading = await this.prisma.readingStatus.create({
      data: {
        userId,
        name: createReadingDto.name,
        writer: createReadingDto.writer,
        startReadDate: new Date(createReadingDto.startReadDate), // 명시적 변환
        status: createReadingDto.status,
        lastReadDate: new Date(createReadingDto.lastReadDate), // 명시적 변환
        genre: createReadingDto.genre,
        currentPage: createReadingDto.currentPage,
        totalPage: createReadingDto.totalPage,
      },
    });

    await this.statisticsService.updateStatisticsAutomatically(
      userId,
      'STATUS',
      createReadingDto.genre,
      createReadingDto.status,
      new Date(createReadingDto.startReadDate).getMonth() + 1,
      new Date(createReadingDto.startReadDate).getFullYear(),
      1,
    );

    return reading;
  }

  async updateReading(
    userId: number,
    readingId: number,
    updateDto: CreateReadingDto,
  ) {
    // 기존 독서 현황 조회
    const existingReading = await this.prisma.readingStatus.findUnique({
      where: { id: readingId },
    });

    if (!existingReading) {
      throw new Error('Reading not found');
    }

    // 독서 상태 수정
    const updatedReading = await this.prisma.readingStatus.update({
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

    // 기존 통계 감소
    await this.statisticsService.updateStatisticsAutomatically(
      userId,
      'STATUS',
      existingReading.genre,
      existingReading.status,
      new Date(existingReading.startReadDate).getMonth() + 1,
      new Date(existingReading.startReadDate).getFullYear(),
      -1, // 기존 데이터 감소
    );

    // 수정된 데이터 통계 증가
    await this.statisticsService.updateStatisticsAutomatically(
      userId,
      'STATUS',
      updateDto.genre,
      updateDto.status,
      new Date(updateDto.startReadDate).getMonth() + 1,
      new Date(updateDto.startReadDate).getFullYear(),
      1, // 수정된 데이터 증가
    );

    return updatedReading;
  }

  async deleteReading(userId: number, readingId: number) {
    // 삭제될 독서 현황 조회
    const deletedReading = await this.prisma.readingStatus.delete({
      where: { id: readingId },
    });

    // 통계 감소
    await this.statisticsService.updateStatisticsAutomatically(
      userId,
      'STATUS',
      deletedReading.genre,
      deletedReading.status,
      new Date(deletedReading.startReadDate).getMonth() + 1,
      new Date(deletedReading.startReadDate).getFullYear(),
      -1, // 데이터 감소
    );

    return deletedReading;
  }

  // 특정 사용자의 독서 현황 조회
  async getReadingsByStatus(userId: number, status: Status) {
    return await this.prisma.readingStatus.findMany({
      where: { userId, status },
    });
  }

  // 독서 현황 수정시 통계 업데이트
  async updateReadingStatistics(
    userId: number,
    statType: StatType,
    genre: Genre,
    status: Status,
    month: number,
    year: number,
  ) {
    await this.statisticsService.updateStatisticsAutomatically(
      userId,
      statType,
      genre,
      status,
      month,
      year,
    );
  }
}
