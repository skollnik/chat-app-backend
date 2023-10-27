import {
  Inject,
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import {
  HASHING_SERVICE,
  JWT_SERVICE,
  THREAD_SERVICE,
  USER_REPOSITORY,
} from './auth.constants';
import { IUserRepository } from './interfaces/user-repository.interface';
import { IHashingService } from './interfaces/hashing-service.interface';
import { IJwtService } from './interfaces/jwt-service.interface';
import { IUserWorker } from 'src/thread/interfaces/thread.interface';
const cluster = require('cluster');

@Injectable()
export class AuthService {
  constructor(
    @Inject(HASHING_SERVICE) private readonly hashingService: IHashingService,
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(THREAD_SERVICE) private readonly userWorkerService: IUserWorker,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    if (!user)
      throw new UnauthorizedException(
        'Invalid login credentials, please try again!',
      );

    const isPasswordCorrect = await this.hashingService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordCorrect)
      throw new UnauthorizedException(
        'Invalid login credentials, please try again!',
      );

    const worker = cluster.fork();
    const userId = user.id;
    this.userWorkerService.asignWorkerToUser(userId, worker);
    console.log(this.userWorkerService.getAllWorkers());
    return await {
      access_token: this.jwtService.generateToken({ id: user.id, email }),
    };
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<any> {
    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) throw new ConflictException('Email already exists!');
    const hashedPassword = await this.hashingService.hashPassword(password);
    const user = await this.userRepository.register(
      firstName,
      lastName,
      email,
      hashedPassword,
    );
    const { password: userPassword, ...rest } = user;
    return rest;
  }

  async getProfile(request) {
    const { password, ...rest } = request.user;
    return rest;
  }
}
