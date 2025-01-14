import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StatType, Genre, Status } from '@prisma/client'; // Prisma에서 import

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async updateStatisticsAutomatically(
    userId: number,
    statType: StatType,
    genre?: Genre,
    status?: Status,
    month?: number,
    year?: number,
    countChange: number = 1,
  ) {
    const where = {
      userId,
      statType,
      genre: genre || null,
      status: status || null,
      month: month || null,
      year: year || null,
    };

    // 기존 데이터 확인
    const existingStatistics = await this.prisma.statistics.findFirst({
      where,
    });

    if (!existingStatistics) {
      // 새로 생성
      await this.prisma.statistics.create({
        data: {
          userId,
          statType,
          genre,
          status,
          month,
          year,
          count: countChange,
        },
      });
    } else {
      // 기존 데이터 업데이트
      await this.prisma.statistics.update({
        where: { id: existingStatistics.id },
        data: { count: existingStatistics.count + countChange },
      });
    }
  }

  // 연도별 통계 조회
  async getYearlyStatistics(userId: number) {
    return this.prisma.statistics.groupBy({
      by: ['year'],
      where: { userId },
      _count: { year: true },
    });
  }

  // 월별 통계 조회
  async getMonthlyStatistics(userId: number) {
    return this.prisma.statistics.groupBy({
      by: ['year', 'month'],
      where: { userId },
      _count: { month: true },
    });
  }

  // 장르별 통계 조회
  async getGenreStatistics(userId: number) {
    return this.prisma.statistics.groupBy({
      by: ['genre'],
      where: { userId },
      _count: { genre: true },
    });
  }

  // 독서 상태별 통계 조회
  async getStatusStatistics(userId: number) {
    return this.prisma.statistics.groupBy({
      by: ['status'],
      where: { userId },
      _count: { status: true },
    });
  }
}
