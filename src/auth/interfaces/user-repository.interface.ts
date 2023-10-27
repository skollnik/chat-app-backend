export interface IUserRepository {
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<any>;
  findById(id: number): Promise<any>;
  findByEmail(email: string): Promise<any>;
}
