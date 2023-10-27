import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<any> {
    const userEntity = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });
    return userEntity;
  }

  async findById(id: number): Promise<any> {
    const userEntity = this.prisma.user.findUnique({
      where: { id },
    });
    if (!userEntity) return null;
    return userEntity;
  }

  async findByEmail(email: string): Promise<any> {
    const userEntity = this.prisma.user.findUnique({
      where: { email },
    });
    if (!userEntity) return null;
    return userEntity;
  }
}
