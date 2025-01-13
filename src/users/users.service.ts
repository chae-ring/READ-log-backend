import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getNickname(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { nickname: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return { nickname: user.nickname };
  }
}
