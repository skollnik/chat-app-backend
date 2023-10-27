import { TokenPayload } from '../token-payload';

export interface IJwtService {
  generateToken(payload: TokenPayload);
  verify(token: string);
}
