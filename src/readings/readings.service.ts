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
    // 독서 상태 생성
    const reading = await this.prisma.readingStatus.create({
      data: {
        userId,
        name: createReadingDto.name,
        writer: createReadingDto.writer,
        startReadDate: new Date(createReadingDto.startReadDate),
        status: createReadingDto.status as Status,
        lastReadDate: new Date(createReadingDto.lastReadDate),
        genre: createReadingDto.genre as Genre,
        currentPage: createReadingDto.currentPage,
        totalPage: createReadingDto.totalPage,
      },
    });

    // 통계 자동 업데이트
    await this.statisticsService.updateStatisticsAutomatically(
      userId,
      'STATUS', // 예시로 'STATUS'로 통계 업데이트
      createReadingDto.genre,
      createReadingDto.status,
      new Date(createReadingDto.startReadDate).getMonth() + 1, // 월
      new Date(createReadingDto.startReadDate).getFullYear(), // 년
      1, // 추가된 책은 1 증가
    );

    return reading;
  }

  // 독서 현황 수정 시 자동으로 통계 업데이트
  async updateReading(
    userId: number,
    readingId: number,
    updateDto: CreateReadingDto,
  ) {
    // 기존 독서 현황 조회
    const existingReading = await this.prisma.readingStatus.findUnique({
      where: { id: readingId },
    });

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

    // 통계 자동 업데이트
    // 기존 통계 감소
    await this.statisticsService.updateStatisticsAutomatically(
      userId,
      'STATUS',
      existingReading.genre,
      existingReading.status,
      new Date(existingReading.startReadDate).getMonth() + 1,
      new Date(existingReading.startReadDate).getFullYear(),
      -1, // 수정 전 상태에서 감소
    );

    // 새로운 통계 증가
    await this.statisticsService.updateStatisticsAutomatically(
      userId,
      'STATUS',
      updateDto.genre,
      updateDto.status,
      new Date(updateDto.startReadDate).getMonth() + 1,
      new Date(updateDto.startReadDate).getFullYear(),
      1, // 수정 후 상태에서 증가
    );

    return updatedReading;
  }

  // 독서 현황 삭제 시 자동으로 통계 업데이트
  async deleteReading(userId: number, readingId: number) {
    const deletedReading = await this.prisma.readingStatus.delete({
      where: { id: readingId },
    });

    // 삭제된 독서 현황의 통계를 차감 (예: count 감소)
    await this.statisticsService.updateStatisticsAutomatically(
      userId,
      'STATUS', // 예시로 'STATUS'로 통계 업데이트
      deletedReading.genre,
      deletedReading.status,
      new Date(deletedReading.startReadDate).getMonth() + 1, // 월
      new Date(deletedReading.startReadDate).getFullYear(), // 년
      -1, // 삭제된 항목은 1 감소
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
