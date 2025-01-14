import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StatType, Genre, Status } from '@prisma/client'; // Prisma에서 import

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  // 사용자가 책을 추가하거나 상태를 변경할 때마다 자동으로 통계를 생성 및 업데이트
  async updateStatisticsAutomatically(
    userId: number,
    statType: StatType,
    genre?: Genre,
    status?: Status,
    month?: number,
    year?: number,
    countChange: number = 1, // countChange: 1이면 증가, -1이면 감소
  ) {
    const where = {
      userId,
      statType,
      genre,
      status,
      month,
      year,
    };

    // 기존 통계 조회 (존재하면 업데이트, 없으면 생성)
    let statistics = await this.prisma.statistics.findFirst({
      where,
    });

    // 없으면 새로 생성
    if (!statistics) {
      statistics = await this.prisma.statistics.create({
        data: {
          userId,
          statType,
          genre,
          status,
          month,
          year,
          count: countChange, // 첫 번째 카운트
        },
      });
    } else {
      // 있으면 카운트 증가 또는 감소
      statistics = await this.prisma.statistics.update({
        where: { id: statistics.id },
        data: { count: { increment: countChange } },
      });
    }

    return statistics;
  }

  // 연도별 통계 조회
  async getYearlyStatistics(userId: number, statType: StatType) {
    return this.prisma.statistics.groupBy({
      by: ['year'],
      where: { userId, statType },
      _count: { year: true },
    });
  }

  // 월별 통계 조회
  async getMonthlyStatistics(userId: number, statType: StatType) {
    return this.prisma.statistics.groupBy({
      by: ['year', 'month'],
      where: { userId, statType },
      _count: { month: true },
    });
  }

  // 장르별 통계 조회
  async getGenreStatistics(userId: number, statType: StatType) {
    return this.prisma.statistics.groupBy({
      by: ['genre'],
      where: { userId, statType },
      _count: { genre: true },
    });
  }

  // 독서 상태별 통계 조회
  async getStatusStatistics(userId: number, statType: StatType) {
    return this.prisma.statistics.groupBy({
      by: ['status'],
      where: { userId, statType },
      _count: { status: true },
    });
  }
}
