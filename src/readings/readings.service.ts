import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
//import { CreateReadingDto, UpdateReadingDto } from '../dto/readings.dto';

@Injectable()
export class ReadingsService {
  constructor(private readonly prisma: PrismaService) {}

  // 독서 현황 전체 조회 (특정 사용자 기준)
  async findByStatus(userId: number, status?: string) {
    const whereClause: any = { userId };

    if (status) {
      whereClause.status = status; // 상태가 전달되었을 경우 조건에 추가
    }

    return this.prisma.readingStatus.findMany({
      where: whereClause,
    });
  }

  // 독서 현황 등록
  /*async create(userId: number, createReadingDto: CreateReadingDto) {
    return this.prisma.readingStatus.create({
      data: {
        userId,
        ...createReadingDto,
      },
    });
  }*/

  // 독서 현황 수정
  /*async update(id: number, userId: number, updateReadingDto: UpdateReadingDto) {
    return this.prisma.readingStatus.updateMany({
      where: { id, userId },
      data: updateReadingDto,
    });
  }*/

  // 독서 현황 삭제
  async delete(id: number, userId: number) {
    return this.prisma.readingStatus.deleteMany({
      where: { id, userId },
    });
  }
}
