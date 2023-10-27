export interface IChatRepository {
  getAllChats(): Promise<any>;
  create(name: string): Promise<any>;
}
