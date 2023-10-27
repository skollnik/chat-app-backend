import { Injectable } from '@nestjs/common';
import { IJwtService } from '../interfaces/jwt-service.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../token-payload';

@Injectable()
export class JWTService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: TokenPayload) {
    return this.jwtService.sign(payload);
  }

  verify(token: string) {
    return this.jwtService.verify(token, { secret: process.env.JWT_SERVICE });
  }
}
