import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Status } from '@prisma/client';
import { FinishedBookDto } from '../dto/mypage.dto'; // DTO 임포트

@Injectable()
export class MypageService {
  constructor(private readonly prisma: PrismaService) {}

  // 사용자가 완독한 도서만 조회
  async getFinishedBooks(userId: number): Promise<FinishedBookDto[]> {
    const books = await this.prisma.readingStatus.findMany({
      where: {
        userId,
        status: Status.COMPLETED, // FINISHED 상태인 도서만 조회
      },
    });

    // DTO 형식으로 반환
    return books.map((book) => ({
      name: book.name,
      writer: book.writer,
      genre: book.genre,
      totalPage: book.totalPage,
    }));
  }
}
